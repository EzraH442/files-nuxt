<script setup lang="ts">

interface props {
  files: { name: string, id: string }[]
  directories: { name: string }[]
}

const props = defineProps<props>()
const directory = useDirectory()

const makeAnchor = (id: string) => {
  return '#' + id;
}
</script>

<template>
  <div class="border border-white max-w-sm p-1">
    <ul>
      <li v-for="dir in directories" class="flex items-center space-x-2 shrink-0">
        <UIcon name="i-heroicons-folder" class="w-4 h-4" />
        <a class="whitespace-nowrap overflow-ellipsis overflow-hidden" v-bind:href="'/files/' + directory + dir.name">{{
          dir.name }}</a>
      </li>
    </ul>
    <ul>
      <li v-for="file in files" class="flex items-center space-x-2">
        <UIcon name="i-heroicons-document" class="w-4 h-4 text-white shrink-0" />
        <a class="whitespace-nowrap overflow-ellipsis overflow-hidden" v-bind:href='makeAnchor(file.id)'>{{ file.name
        }}</a>
      </li>
    </ul>
  </div>
</template>