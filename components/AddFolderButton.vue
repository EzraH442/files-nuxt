<script setup>
const directory = useDirectory()
const isOpen = ref(false)
const formData = ref({
  folderName: ''
})

const onSubmit = async () => {
  if (!formData.value.folderName) {
    return
  }

  const { data, error } = await useFetch(`/api/files/createFolder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ folderName: formData.value.folderName, directory }).toString(),
  });

  console.log('data', data)
}

</script>

<template>
  <div>
    <UButton label="Add folder" @click="isOpen = true" icon="i-heroicons-folder-plus" />

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h2>Add Folder</h2>
        </template>

        <p>
          Create a new folder inside the current location
        </p>

        <div class="my-8"></div>

        <UFormGroup label="Folder name">
          <UInput v-model="formData.folderName" placeholder="Folder name" />
        </UFormGroup>

        <template #footer>
          <div class="flex w-full justify-between">
            <UButton label="Submit" @click="onSubmit" />
            <UButton label="Cancel" @click="isOpen = false" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

