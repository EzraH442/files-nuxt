<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { logUserOut } = useAuthStore();
const router = useRouter()

const logout = async () => {
  await logUserOut();
  router.push('/login');
};
</script>

<template>
  <div class="mx-2">
    <div class="flex space-x-2 items-center">
      <nuxt-link class="bg-green-200" to="/" no-prefetch>Home</nuxt-link>
      <nuxt-link class="bg-green-200" to="/files" no-prefetch>Files</nuxt-link>
      <nuxt-link class="bg-green-200" to="/login" no-prefetch>Login</nuxt-link>
      <button class="bg-green-200" no-prefetch @click="logout">Sign out</button>
    </div>
    <slot />
  </div>
</template>
