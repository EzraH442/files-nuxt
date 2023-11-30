<script setup lang="ts">
import type { _File } from '~/server/api/files/list';
import { isImage, isVideo } from '~/utils/helpers'

const directory = useDirectory()
const props = defineProps<{ file: _File }>()

const getSrc = (file: _File) => {
  const name = file.name;

  if (isHEIC(name)) {
    const params = new URLSearchParams({
      filename: directory + name,
      quality: '50'
    })

    return `/api/files/get?${params}`
  }

  else {
    const url = `https://static.ezrahuang.com/file/ezrah442-testing/${directory}${name}`;
    return url
  }

}
</script>
<template>
  <UTooltip :text="file.name">
    <img v-if="isImage(file.name) || isHEIC(file.name)" v-bind:src="getSrc(file)" v-bind:id="file.id" />
    <video v-else-if="isVideo(file.name)" controls v-bind:id="file.id" preload="metadata">
      <source v-bind:src="getSrc(file)" />
      Your browser does not support the video tag.
    </video>
    <p v-else v-bind:id="file.id">{{ file.name }}</p>
  </UTooltip>
</template>