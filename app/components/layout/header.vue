<script setup lang="ts">
  import { useAuthStore } from '~/store/auth';
  const { t, locales, setLocale, locale } = useI18n();
  const { toggleSideBar, isSideBarPinned } = useLayout();
  const { logout } = useAuthStore();
  const color = useColorMode();
  const items = computed(() => [
    [
      {
        label: t('pages.buttons.profile'),
        avatar: {
          src: 'https://avatars.githubusercontent.com/u/26212497?v=4',
        },
        type: 'link',
        to: { name: 'profile' },
      },
      {
        label: t('pages.buttons.language'),
        icon: 'dashicons:translation',
        children: locales.value.map((local) => {
          return {
            label: local.name,
            icon: `circle-flags:${local.code}`,
            onSelect: () => setLocale(local.code),
            class:
              locale.value === local.code ? 'bg-[var(--ui-bg-elevated)]' : '',
          };
        }),
      },
      {
        label: t('pages.buttons.theme'),
        icon: 'mdi:theme-light-dark',
        children: [
          {
            label: t('pages.buttons.light'),
            icon: `i-ph-sun-dim-duotone`,
            onSelect: () => (color.preference = 'light'),
            class: color.value === 'light' ? 'bg-[var(--ui-bg-elevated)]' : '',
          },
          {
            label: t('pages.buttons.dark'),
            icon: `i-ph-moon-stars-duotone`,
            onSelect: () => (color.preference = 'dark'),
            class: color.value === 'dark' ? 'bg-[var(--ui-bg-elevated)]' : '',
          },
        ],
      },
      {
        label: t('pages.buttons.logout'),
        icon: 'i-lucide-log-out',
        color: 'error',
        onSelect: () => logout(),
      },
    ],
  ]);
</script>
<template>
  <nav
    class="flex items-center justify-between h-14 fixed pl-2 pr-4 w-full dark:bg-[var(--ui-color-neutral-900)] transition-all duration-200 ease-in-out"
    :class="{ 'lg:w-[calc(100dvw-12%)]': isSideBarPinned }"
  >
    <UButton
      icon="lucide:align-justify"
      size="xl"
      variant="ghost"
      color="neutral"
      class="lg:hidden"
      @click="toggleSideBar()"
    />
    <UButton
      icon="tabler:layout-sidebar-right"
      size="xl"
      variant="ghost"
      color="neutral"
      class="hidden lg:flex p-1"
      @click="toggleSideBar()"
    />
    <AppLogo :class="{ 'invisible': isSideBarPinned }" />
    <div class="flex items-center justify-between gap-2">
      <UDropdownMenu
        :items="items"
        :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8,
          collisionPadding: 8,
        }"
        :ui="{
          content: 'w-48',
          item: 'hover:cursor-pointer',
        }"
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/26212497?v=4"
          class="hover:cursor-pointer"
        />
      </UDropdownMenu>
    </div>
  </nav>
</template>

<style scoped></style>
