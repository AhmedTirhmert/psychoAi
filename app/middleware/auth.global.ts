export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth();

  const publicPages = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
  ];

  const isPublicPage = publicPages.includes(to.path);

  if (isPublicPage && isAuthenticated.value) {
    return navigateTo({ name: 'home' });
  }

  if (!isPublicPage && !isAuthenticated.value) {
    const query = to.fullPath !== '/' ? { redirect: to.fullPath } : {};
    return navigateTo({
      name: 'login',
      query,
    });
  }
});
