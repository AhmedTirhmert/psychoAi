import type { User } from '~~/types/auth';
import { useApi } from '~~/utils/api';

export const useUser = <T = User>() => {
  const token = useCookie('access_token');
  const user = useState<T | undefined | null>('user', () => null);

  const fetchCurrentUser = async () => {
    try {
      if (user.value) return;

      user.value = await useApi('auth/user/', 'GET', undefined, true);
    } catch (error: any) {
      if (error?.statusCode == 401 && token.value) fetchCurrentUser();
      if ([401, 419].includes(error?.response?.status)) return null;
      // throw error;
    }
  };
  return {
    user,
    fetchCurrentUser,
  };
};
