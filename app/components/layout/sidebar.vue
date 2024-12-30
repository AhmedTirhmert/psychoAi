<script setup lang="ts">
  const { isSideBarPinned, toggleSideBar } = useLayout();
  //
</script>
<template>
  <aside
    class="absolute w-full lg:w-[12%] min-h-screen max-h-screen overflow-y-auto lg:block left-0 z-10 transition-all -translate-x-full ease-in-out duration-200 bg-[var(--ui-color-neutral-800)] lg:bg-inherit"
    :class="[isSideBarPinned ? 'translate-x-0' : '']"
  >
    <AppLogo class="block" />
    <UButton
      class="lg:hidden"
      variant="ghost"
      icon="lucide:x"
      @click="toggleSideBar()"
    />
  </aside>
</template>

<style scoped></style>
