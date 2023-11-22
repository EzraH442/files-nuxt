export default defineEventHandler(async (e) => {
  const body = await readFormData(e);

  console.log('login api request');

  const email = body.get('email')?.toString() ?? '';
  const password = body.get('password')?.toString() ?? '';
  const captcha = body.get('captcha')?.toString() ?? '';

  try {
    const res = await makeLoginRequest(
      new URLSearchParams({ email, password, captcha }),
    );

    console.log('res', res);
    if (res) {
      console.log('set cookie', res);
      setCookie(e, 'token', res, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
      });
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
});

export interface JWTResponse {
  success: boolean;
  token?: string;
  err?: string;
}

const makeLoginRequest = async (body: URLSearchParams) => {
  try {
    const data = await $fetch<JWTResponse>(`${process.env.authUrl}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (data.token) {
      return data.token;
    }

    return '';
  } catch (e) {
    console.log(e);
    return '';
  }
};
