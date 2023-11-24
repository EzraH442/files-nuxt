<script setup lang="ts">
import type { _File } from '~/server/api/files/list';
import { isImage, isVideo } from '~/utils/helpers'

const directory = useDirectory()
const props = defineProps<{ file: _File }>()

</script>
<template>
  <UTooltip :text="file.name">
    <img v-if="isImage(file.name)" v-bind:src="'/api/files/get?filename=' + directory + file.name" v-bind:id="file.id" />
    <video v-else-if="isVideo(file.name)" v-bind:id="file.id" />
    <p v-else v-bind:id="file.id">{{ file.name }}</p>
  </UTooltip>
</template>