<script setup lang="ts">

interface props {
  files: { name: string, id: string }[]
  directories: { name: string }[]
}
const props = defineProps<props>()
</script>

<template>
  <div class="flex">
    <div>
      <ul>
        <li v-for="dir in directories" class="flex items-center space-x-2">
          <!-- material-symbols:folder-outline -->
          <UIcon name="i-material-folder-outline" />
          <a v-bind:href="'/files/' + dir.name">{{ dir.name }}</a>
        </li>
      </ul>
      <ul>
        <li v-for="file in files" class="flex items-center space-x-2">
          <!-- material-symbols:image-outline -->
          <UIcon name="i-material-image-outline"></UIcon>
          <a v-bind:href="'#' + file.id">{{ file.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>