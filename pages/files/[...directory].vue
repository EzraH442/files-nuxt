<script setup lang="ts">
import { type _Directory, type _File } from '~/server/api/files/list';

definePageMeta({
  middleware: ['auth']
})

const { data, loading, error } = useFileList()

const open = ref(true)
</script>

<template>
  <div class="">
    <p v-if="loading">Fetching directories...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else class="">
      <div class="flex">
        <div class="mr-4">
          <UButton @click="open = !open" class="flex items-center" label="Show folders"
            v-bind:icon="open ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-up'" />
          <div v-if="open">
            <Explorer :files="data.files" :directories="data.directories" />
          </div>
        </div>
        <div class="grow">
          <div class="w-full h-60 border-2 border-dashed flex items-center justify-center ">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-arrow-up-tray" class="w-4 h-4" />
              <p>
                Upload files
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

