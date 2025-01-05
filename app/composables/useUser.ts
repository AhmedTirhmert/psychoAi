import type { User } from '~~/types/auth';
import { useApi } from '~~/utils/api';

export const useUser = <T = User>() => {
  const user = useState<T | undefined | null>('user', () => null);

  const fetchCurrentUser = async () => {
    try {
      if (user.value) return;

      user.value = await useApi('auth/user/');
    } catch (error: any) {
      if ([401, 419].includes(error?.response?.status)) return null;
      // throw error;
    }
  };
  return {
    user,
    fetchCurrentUser,
  };
};
