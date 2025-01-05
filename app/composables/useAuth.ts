import type { LoginForm, User } from '~~/types/auth';
import { useApi } from '~~/utils/api';

export const useAuth = <T = User>() => {
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
    logout,
    checkAuth,
  };
};
