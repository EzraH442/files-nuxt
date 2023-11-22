<script setup lang="ts">
import { type _Directory, type _File } from '~/server/api/files/list';

definePageMeta({
  middleware: ['auth']
})

const { data, loading, error } = useFileList()

const open = ref(true)
</script>

<template>
  <div class="bg-gray-200">
    <p v-if="loading">Fetching directories...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else class="bg-red-200">
      <div class="flex">
        <div>
          <button @click="open = !open" class="flex items-center">
            <DownOutlined v-if="open" />
            <UpOutlined v-else />
            Show folders
          </button>
          <div v-if="open" class="absolute bg-gray-50 w-64 overflow-x-scroll">
            <Explorer :files="data.files" :directories="data.directories" />
          </div>
        </div>
        <div class="w-full">
          <div class="w-full h-60 border-dashed flex items-center justify-center bg-green-100">
            <div class="flex items-center">
              <UploadOutlined />
              <p>
                Upload file
              </p>
            </div>
          </div>
          <div>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

