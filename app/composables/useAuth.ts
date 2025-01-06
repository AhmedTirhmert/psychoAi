import type { LoginForm, registerForm, User } from '~~/types/auth';
import { useApi } from '~~/utils/api';

export const useAuth = () => {
  const accessToken = useCookie('access_token', {
    maxAge: 7200, // 2 hours
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
  const refreshToken = useCookie('refresh_token', {
    maxAge: 604800, //7 day
    secure: true,
    sameSite: 'strict',
  });
  const { user, fetchCurrentUser } = useUser();
  const isAuthenticated = computed(() => !!accessToken.value);

  async function login(credentials: LoginForm) {
    try {
      const { key } = await useApi(
        'auth/login/',
        'POST',
        {
          username: credentials.email_or_username,
          password: credentials.password,
        },
        false,
      );
      accessToken.value = key;

      user.value = await fetchCurrentUser();
    } catch (error: any) {
      throw Object.values(error.data).join('\n');
    }
  }

  const register = async (userData: registerForm) => {
    try {
      return await useApi(
        'auth/registration/',
        'POST',
        {
          username: userData.username,
          email: userData.email,
          password1: userData.password,
          password2: userData.confirm_password,
        },
        false,
      );
    } catch (error: any) {
      throw createError({
        message: Object.values(error.data).join('\n'),
      });
    }

    // if (error.value) throw Object.values(error.value.data.data).join('\n');
    // return data;
  };

  const logout = async () => {
    try {
      if (isAuthenticated.value) {
        await useApi('auth/logout', 'POST');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearSession();
      navigateTo({
        name: 'login',
      });
    }
  };

  // Validate token and get user data
  const checkAuth = async () => {
    if (!accessToken.value) {
      user.value = null;
      return false;
    }

    try {
      const userData = await useApi('/auth/user/', 'GET');
      user.value = userData;
      return true;
    } catch (error) {
      accessToken.value = null;
      user.value = null;
      return false;
    }
  };

  const clearSession = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
  };
  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };
};
