<script setup lang="ts">
  const { isSideBarPinned, toggleSideBar } = useLayout();
  const items = ref([
    [
      {
        label: 'Profile',
        icon: 'lucide:user',
        to: { name: 'profile' },
      },
      {
        label: 'Sessions',
        icon: 'lucide:calendar-clock',
        to: { name: 'sessions' },
      },
    ],
  ]);

  const items2 = ref([
    [
      {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        badge: '3.8k',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
      },
      {
        label: 'Help',
        icon: 'i-lucide-circle-help',
        disabled: false,
      },
    ],
  ]);
</script>
<template>
  <aside
    class="absolute flex flex-col justify-between w-full lg:w-[12%] min-h-screen max-h-screen overflow-y-auto lg:block left-0 z-10 transition-all -translate-x-full ease-in-out duration-250 bg-[var(--ui-bg)] lg:bg-inherit"
    :class="[isSideBarPinned ? 'translate-x-0' : '']"
  >
    <div class="relative">
      <AppLogo class="block" />
      <UButton
        class="lg:hidden absolute right-2 top-[50%] -translate-y-[50%]"
        variant="ghost"
        icon="lucide:chevrons-left"
        @click="toggleSideBar()"
      />
    </div>
    <div
      class="flex flex-col justify-between h-[calc(100dvh-58px)] mt-auto py-1"
    >
      <UNavigationMenu
        highlight
        highlight-color="secondary"
        orientation="vertical"
        :items="items"
        class="w-full"
      />
      <UNavigationMenu
        highlight
        highlight-color="primary"
        orientation="vertical"
        :items="items2"
        class="w-full"
      />
    </div>
  </aside>
</template>

<style scoped></style>
