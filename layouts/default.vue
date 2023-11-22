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
  <nav class="flex items-center border-2 border-cyan-200 mb-6">
    <nuxt-link to="/" no-prefetch>Home</nuxt-link>
    <nuxt-link to="/files" no-prefetch>Files</nuxt-link>
    <nuxt-link to="/login" no-prefetch>Login</nuxt-link>
    <button no-prefetch @click="logout">Sign out</button>
  </nav>
  <div class="mx-4">
    <slot />
  </div>
</template>

<style>
nav a,
nav button {
  padding: 12px 14px;
}

nav a:hover {
  text-decoration: underline;
}
</style>
