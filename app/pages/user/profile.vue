<script setup lang="ts">
  definePageMeta({
    name: 'profile',
  });

  const { user } = useUser();
</script>
<template>
  <div>{{ user }}</div>
</template>

<style scoped></style>
