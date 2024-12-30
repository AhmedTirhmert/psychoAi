export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const login = async (userData: any) => {
    user.value = userData;
    navigateTo({ name: 'home' });
  };

  const logout = async () => {
    user.value = null;
    navigateTo({ name: 'login' });
  };

  const isAuthenticated = computed(() => !!user.value);

  return { user, isAuthenticated, login, logout };
});
