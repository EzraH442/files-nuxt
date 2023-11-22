// store/auth.ts

import { defineStore } from 'pinia';
import type { JWTResponse } from '~/server/api/login';

interface UserPayloadInterface {
  email: string;
  password: string;
  captcha: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
  }),
  actions: {
    async authenticateUser({ email, password, captcha }: UserPayloadInterface) {
      try {
        const { data: _authenticated, error } = await useFetch(`/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email, password, captcha }).toString(),
        });

        if (_authenticated.value) {
          this.authenticated = _authenticated.value;
        } else {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    async logUserOut() {
      const { data, error } = await useFetch(`/api/logout`, {
        method: 'POST',
      });

      return;
    },
  },
});
