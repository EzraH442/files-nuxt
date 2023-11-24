<script setup lang="ts">
import { FileStatus } from '~/composables/useDraggedFiles'

const { files, addFiles, removeFile } = useDraggedFiles()
const _dir = useDirectory()

const emit = defineEmits(['uploaded']);

const open = ref(false)
const uploading = ref(false)

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const onUploadChange = (e: Event) => {
  const event = <InputFileEvent>(e)
  if (event.target.files) {
    addFiles(event.target.files)
    event.target.value = null
  }
}

const getTotalSize = () => {
  let s = 0;
  files.value.forEach(f => {
    s += f.file.size
  })
  return s
}

const onSubmit = async () => {
  const res = await Promise.all(files.value.map((f) => f.upload(_dir)))
  uploading.value = false
  open.value = false
  emit('uploaded')
}

const onCancel = () => {
  open.value = false
}

</script>

<template>
  <div>
    <UButton label="Upload files" @click="open = true" icon="i-heroicons-arrow-up-tray" />

    <UModal v-model="open">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h2>Upload files</h2>
        </template>

        <p>
          Upload files in the current folder
        </p>

        <div class="my-8" />

        <div class="w-full h-60 border-2 border-dashed">
          <Upload class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
            <label for="file-input" class="w-full h-full cursor-pointer">
              <div class="h-full flex items-center space-x-2 justify-center">
                <UIcon name="i-heroicons-arrow-up-tray" class="w-4 h-4" />
                <p>
                  Upload files
                </p>
              </div>
              <input type="file" id="file-input" multiple @change="onUploadChange" hidden />
            </label>
          </Upload>
        </div>


        <div v-show="files.length" class="border border-white my-2 p-2">
          <p class="underline">Total size: {{ toHumanSize(getTotalSize()) }}</p>
          <div v-for="file of files" :key="file.file.name" class="flex items-center">
            <UTooltip text="Delete item" v-if="file.status === FileStatus.PENDING_UPLOAD">
              <button @click="removeFile(file)" class="hover:line-through">{{
                file.file.name }} ({{ toHumanSize(file.file.size) }})</button>
            </UTooltip>
            <p v-else-if="file.status === FileStatus.UPLOADING"> Uploading {{ file.file.name }} ...</p>
            <p v-else-if="file.status === FileStatus.UPLOADED" class="text-green-300"> {{ file.file.name }} </p>
            <p v-else-if="file.status === FileStatus.UPLOAD_FAILED" class="text-red-300"> Failed to upload {{
              file.file.name }}</p>
          </div>
        </div>

        <template #footer>
          <div class="flex w-full justify-between">
            <UButton label="Cancel" @click="onCancel" />
            <UButton :disabled="uploading" :loading="uploading" label="Submit" @click="onSubmit" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

