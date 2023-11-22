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
      <div>
        <button @click="open = !open" class="flex items-center">
          <DownOutlined v-if="open" />
          <UpOutlined v-else />
          Show folders
        </button>
      </div>
      <div class="relative">
        <div class="absolute bg-gray-50 w-64 overflow-x-scroll">
          <div class="flex">
            <div v-if="open">
              <ul>
                <li v-for="dir in data.directories" class="flex items-center space-x-2">
                  <FolderOutlined />
                  <a v-bind:href="'/files/' + dir.name">{{ dir.name }}</a>
                </li>
              </ul>
              <ul>
                <li v-for="file in data.files" class="flex items-center space-x-2">
                  <FileOutlined />
                  <a v-bind:href="'#' + file.id">{{ file.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-green-200">
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
    </div>
  </div>
</template>

