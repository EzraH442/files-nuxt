<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

const asyncExecuteHCaptcha = ref<VueHcaptcha | null>(null);
const runtimeConfig = useRuntimeConfig()
const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const router = useRouter();

const formData = ref({
  email: '',
  password: '',
})

const verified = ref(false);
const expired = ref(false);
const token = ref("");
const eKey = ref("");
const error = ref("");

function onVerify(tk: string, ekey: string) {
  verified.value = true;
  token.value = tk;
  eKey.value = ekey;
  console.log(`Callback token: ${tk}, ekey: ${ekey}`);
}

function onExpire() {
  verified.value = false;
  token.value = "";
  eKey.value = "";
  expired.value = true;
  console.log('Expired');
}

function onError(err: any) {
  token.value = "";
  eKey.value = "";
  error.value = err;
  console.log(`Error: ${err}`);
}

const login = async () => {

  if (asyncExecuteHCaptcha.value) {
    const res = await asyncExecuteHCaptcha.value.executeAsync()

    const authParams = { ...formData.value, captcha: res.response }
    await authenticateUser(authParams)

    if (authenticated) {
      router.push('/files')
    }
  }

};

</script>

<template>
  <div>
    <h1 class="text-3xl mb-4">Login</h1>

    <div class="w-96 flex flex-col space-y-3">

      <UFormGroup label="Email">
        <UInput name="email" v-model="formData.email" required />
      </UFormGroup>

      <UFormGroup label="Password">
        <UInput name="password" v-model="formData.password" required type="password" />
      </UFormGroup>


      <UButton @click="login" class="px-3 py-2 rounded-md w-36" label="Login" />

      <vue-hcaptcha class="hidden" ref="asyncExecuteHCaptcha" sitekey={{ runtimeConfig.hcaptchaSitekey }}
        @verify="onVerify" @expired="onExpire" @challengeExpired="onExpire" @error="onError" />

      <div v-if="verified" id="verified">
        <h1>Successfully Verified!</h1>
        <p>token: {{ token }}</p>
        <p>eKey: {{ eKey }}</p>
      </div>

      <div v-if="expired" id="expired">
        <h1>Challenge expired!</h1>
      </div>

      <div v-if="error" id="error">
        <h1>Error:</h1>
        <p>{{ error }}</p>
      </div>

    </div>
  </div>
</template>