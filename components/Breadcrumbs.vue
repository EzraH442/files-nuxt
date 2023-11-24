<script setup lang="ts">
const props = defineProps<{
  directories: string[] | string
}>()

console.log(props)
const getSteps = (steps: number) => {
  let ret = '/files'
  for (let i = 0; i < steps; i++) {
    ret += `/${props.directories[i]}`
  }
  return ret
}
</script>

<template>
  <div class="flex">
    <span class="flex items-center">
      <UIcon name="i-heroicons-folder" class="mr-2" />
      <a href="/files" class="hover:underline">
        Home
      </a>
      <p class="mx-2" v-if="directories">></p>
    </span>
    <span v-for="(dir, index) in directories" class="flex items-center">
      <UIcon name="i-heroicons-folder" class="mr-2" />
      <a v-bind:href="getSteps(index + 1)" class="hover:underline">
        {{ dir }}
      </a>
      <p v-if="index !== directories.length - 1" class="mx-2">></p>
    </span>
  </div>
</template>