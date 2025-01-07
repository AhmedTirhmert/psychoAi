export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp();
  const { isSideBarPinned, isMobile, hideSideBar } = useLayout();
  if (isSideBarPinned.value && isMobile.value) hideSideBar();
  useHead({
    title: computed(() => {
      return `${nuxtApp._appConfig.name} - ${nuxtApp.$i18n.t(
        `pages.titles.${String(to.name)}`,
      )}`;
    }),
  });
});
