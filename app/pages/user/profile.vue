<script setup lang="ts">
  definePageMeta({
    name: 'profile',
  });

  const { user } = useUser();
</script>
<template>
  <div class="flex items-center justify-center w-dvw h-dvh">
    {{ user }}
  </div>
</template>

<style scoped></style>
