<script setup lang="ts">
  definePageMeta({
    name: 'home',
  });
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <span class="text-2xl font-semibold"
      >{{ $t('pages.messages.welcome_to') }} <AppLogo />
    </span>
  </div>
</template>

<style scoped></style>
