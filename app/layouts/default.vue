<script setup lang="ts">
  const { isSideBarPinned } = useLayout();
</script>
<template>
  <main class="w-full h-dvh flex">
    <LayoutSidebar />
    <section
      class="w-full transition-all duration-200 ml-auto max-h-dvh overflow-hidden ease-in-out"
      :class="{ 'lg:w-[calc(100dvw-12%)]': isSideBarPinned }"
    >
      <LayoutHeader />
      <!-- bg-[var(--ui-color-neutral-800)] -->
      <section
        class="transition-all duration-200 ease-in-out h-[calc(100vh-3.5rem)] mt-[3.5rem] max-h-[calc(100vh-3.5rem)] dark:border-[var(--ui-color-neutral-800)] border-[var(--ui-color-neutral-200)] border-t pt-2 px-2"
        :class="{ 'border-l rounded-tl-lg': isSideBarPinned }"
      >
        <slot />
      </section>
    </section>
  </main>
</template>

<style scoped></style>
