<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

let active = ref(false)

function setActive() {
  active.value = true
}
function setInactive() {
  active.value = false
}

const emit = defineEmits(['files-dropped'])

const onDrop = (e: DragEvent) => {
  if (e.dataTransfer?.files) {
    setInactive()
    emit('files-dropped', [...e.dataTransfer.files]);
  }
}

const preventDefaults = (e: Event) => {
  e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})
</script>


<template>
  <div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive"
    @drop.prevent="onDrop" class="h-full w-full">
    <!-- share state with the scoped slot -->
    <slot :dropZoneActive="active"></slot>
  </div>
</template>
