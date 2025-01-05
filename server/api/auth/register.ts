import { useApi } from '~~/utils/api';
import { registerForm } from '~~/types/auth';

export default defineEventHandler(async (event) => {
  const body = await readBody<registerForm>(event);
  try {
    const response = await useApi(
      'auth/registration/',
      'POST',
      {
        username: body.username,
        email: body.email,
        password1: body.password,
        password2: body.confirm_password,
      },
      false,
      event,
    );
    return response;
  } catch (error: any) {
    console.log('Register ERROR', error);
    throw createError({
      ...error,
    });
  }
});
