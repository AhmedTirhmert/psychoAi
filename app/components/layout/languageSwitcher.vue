<script setup lang="ts">
  const { locales, locale, setLocale } = useI18n();

  const languages = computed(() =>
    locales.value.map((local) => {
      return {
        label: local.name,
        icon: `circle-flags:${local.code}`,
        onSelect: () => setLocale(local.code),
        class: locale.value === local.code ? 'bg-[var(--ui-bg-elevated)]' : '',
      };
    }),
  );
</script>
<template>
  <div class="flex items-center gap-0">
    <!-- <select
      @change="setLocale(locale)"
      class="outline-none focus:outline-none ring-0"
      v-model="locale"
      name="lang"
      id="lang"
    >
      :class="{ 'hidden': $device.isDesktop }"
      <option v-for="local in locales" :value="local.code">
        {{ local.name }}
      </option>
    </select> -->
    <UDropdownMenu
      :items="languages"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8,
      }"
      :ui="{
        content: 'w-fit',
        item: 'hover:cursor-pointer',
        itemLeadingIcon: 'w-4 grayscale-[40%]',
      }"
    >
      <UButton
        :icon="locale ? `circle-flags:${locale}` : 'dashicons:translation'"
        color="neutral"
        variant="ghost"
      />
    </UDropdownMenu>
  </div>
</template>

<style scoped></style>
