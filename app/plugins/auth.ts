export default defineNuxtPlugin(async () => {
  const { user, fetchCurrentUser } = useUser();

  if (user.value) return;

  await fetchCurrentUser();
});
