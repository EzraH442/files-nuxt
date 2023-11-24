<script setup lang="ts">
import { type _Directory, type _File } from '~/server/api/files/list';
import { FileStatus } from '~/composables/useDraggedFiles'

definePageMeta({
  middleware: ['auth']
})

const d = useRoute()
const directory = d.params.directory
const _dir = useDirectory()
const open = ref(true)

const { data, loading, error } = useFileList()
const { files, addFiles, removeFile } = useDraggedFiles()

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


const uploading = ref(false)
const startUpload = async () => {
  uploading.value = true
  console.log('start upload...')
  for (let i = 0; i < files.value.length; i++) {
    await files.value[i].upload(_dir)
  }
  uploading.value = false
}
</script>

<template>
  <div class="">
    <p v-if="loading">Fetching directories...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else class="">
      <Breadcrumbs :directories="directory" />
      <div class="flex">
        <div class="mr-4">
          <div class="flex">
            <UButton @click="open = !open" class="flex items-center mr-auto" label="Show folders"
              v-bind:icon="open ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-up'" />
            <AddFolderButton />
          </div>
          <div v-if="open">
            <Explorer :files="data.files" :directories="data.directories" />
          </div>
        </div>
        <div class="grow">
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
            <UButton label="Upload (this action is irreversible!)" @click="startUpload" v-bind:loading="uploading" />
          </div>

          <div>
            <Media v-for="file in data.files" :file="file" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

