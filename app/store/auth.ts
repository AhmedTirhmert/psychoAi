export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const login = async (userData: any) => {
    const response = await useFetch('/api/auth/signin');
    user.value = userData;
    // navigateTo({ name: 'home' });
  };

  const register = async (userData: any) => {
    const { data, error } = await useFetch('/api/auth/register', {
      body: { ...userData },
      method: 'post',
    });
    if (error.value) throw Object.values(error.value.data.data).join('\n');
    return data;
  };

  const logout = async () => {
    user.value = null;
    navigateTo({ name: 'login' });
  };

  const isAuthenticated = computed(() => !!user.value);

  return { user, isAuthenticated, login, logout, register };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
