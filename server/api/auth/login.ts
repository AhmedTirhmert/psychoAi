import { useApi } from '~~/utils/api';
import { LoginForm } from '~~/types/auth';

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginForm>(event);
  try {
    const response = await useApi(
      event,
      'auth/login/',
      'POST',
      {
        username: body.email_or_username,
        password: body.password,
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
