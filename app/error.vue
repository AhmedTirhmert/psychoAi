<script setup lang="ts">
  import type { NuxtError } from '#app';
  definePageMeta({
    layout: 'blank',
  });

  const props = defineProps({
    error: Object as () => NuxtError,
  });

  const handleError = () => clearError({ redirect: '/' });
</script>
<template>
  <div
    class="flex flex-col gap-3 w-screen h-screen items-center justify-center"
  >
    <h1 class="lg:text-[29rem] text-9xl lg:leading-0 font-semibold">
      {{ error?.statusCode }}
    </h1>
    <div
      class="lg:absolute flex flex-col items-center gap-2 bg-[var(--ui-bg)] lg:shadow-xs shadow-gray-500 px-8 py-2 rounded-md"
    >
      <h2 class="text-4xl font-semibold">Page not found</h2>
      <UButton
        @click="handleError"
        label="Back home"
        variant="outline"
        class="w-fit"
      />
    </div>
  </div>
</template>

<style scoped></style>
