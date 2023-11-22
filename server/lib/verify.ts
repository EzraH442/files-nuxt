interface VerifyResponse {
  valid: boolean;
  errors: string[];
}

export const makeVerifyRequest = async (body: URLSearchParams) => {
  const verifyResponse = await $fetch<VerifyResponse>(
    `${process.env.authUrl}/verify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    },
  );

  return verifyResponse as VerifyResponse;
};
