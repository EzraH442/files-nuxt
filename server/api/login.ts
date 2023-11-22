export default defineEventHandler(async (e) => {
  const body = await readFormData(e);

  const email = body.get('email') ?? '';
  const password = body.get('password') ?? '';
  const captcha = body.get('captcha') ?? '';

  const params = new URLSearchParams({
    email: email.toString(),
    password: password.toString(),
    captcha: captcha.toString(),
  });

  try {
    const res = await makeLoginRequest(params);

    if (res) {
      setCookie(e, 'token', res, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
      });
    }
    return !!res;
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
