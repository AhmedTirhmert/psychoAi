import { useApi } from '~~/server/utils/api';
import { registerForm } from '~~/types/auth';

export default defineEventHandler(async (event) => {
  const body = await readBody<registerForm>(event);
  try {
    const response = await useApi(
      event,
      'auth/registration/',
      'POST',
      {
        username: body.username,
        email: body.email,
        password1: body.password,
        password2: body.confirm_password,
      },
      false,
    );
    return response;
  } catch (error: any) {
    throw createError({
      ...error,
    });
  }
});
