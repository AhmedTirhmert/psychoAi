export default defineNuxtPlugin(async () => {
  const { user, fetchCurrentUser } = useUser();
  const token = useCookie('access_token');

  if (user.value) return;

  token.value ? await fetchCurrentUser() : null;
});
