<script setup lang="ts">
import { type _Directory, type _File } from '~/server/api/files/list';

const d = useRoute()
const directory = d.params.directory
const open = ref(true)

const { data, loading, error, refetch } = useFileList()

const onCreate = () => {
  refetch()
}

</script>

<template>
  <div class="">
    <p v-if="loading">Fetching directories...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <div class="mb-2">
        <Breadcrumbs :directories="directory" />
      </div>
      <div class="flex space-x-2 my-2">
        <UButton @click="open = !open" class="flex items-center" label="Show folders"
          v-bind:icon="open ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-up'" />
        <AddFolderButton @created="onCreate" />
        <UploadButton @uploaded="onCreate" />
        <UButton @click="onCreate" icon="i-heroicons-arrow-path">Refresh</UButton>
      </div>
      <div class="flex">
        <div class="mr-4">
          <div v-if="open">
            <Explorer :files="data.files" :directories="data.directories" />
          </div>
        </div>
        <div class="grow">
          <div>
            <Media v-for="file in data.files" :file="file" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

