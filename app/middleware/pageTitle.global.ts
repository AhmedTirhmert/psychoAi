export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp();

  useHead({
    title: computed(() => {
      return `${nuxtApp._appConfig.name} - ${nuxtApp.$i18n.t(
        `pages.titles.${String(to.name)}`,
      )}`;
    }),
  });
});
