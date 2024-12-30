<script setup lang="ts">
  import * as v from 'valibot';
  import type { FormSubmitEvent } from '#ui/types';

  const { t } = useI18n();
  const toast = useToast();
  const isLoading = ref<boolean>(false);
  const schema = computed(() =>
    v.object({
      email: v.pipe(v.string(), v.email(t('pages.auth.errors.invalid_email'))),
    }),
  );
  type Schema = v.InferOutput<typeof schema.value>;

  const state = reactive({
    email: '',
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      toast.add({
        title: t('responses.status.success'),
        icon: 'lucide:mail-check',
        description: t('responses.messages.password_reset_email_has_been_sent'),
      });
      console.log(event.data);
    }, 500);
  }

  definePageMeta({
    layout: 'blank',
  });
</script>
<template>
  <main class="flex justify-center items-center w-full h-dvh">
    <UCard class="flex flex-col w-[80%] min-w-80 md:w-96">
      <div class="text-center">
        <!-- <span class="text-xs leading-0 -mb-2">Welcom to</span> -->
        <!-- <span class="font-bold text-3xl block mb-4">PsychoAI</span> -->
        <span class="text-2xl font-semibold block mb-5">{{
          $t('pages.auth.messages.header_forgot_password')
        }}</span>
        <p class="text-sm block mb-5 mx-auto">
          {{ $t('pages.auth.messages.instructions_forgot_password') }}
        </p>
      </div>
      <UForm
        :schema="v.safeParser(schema)"
        :state="state"
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UFormField :label="$t('pages.auth.labels.email')" name="email">
          <UInput
            class="block"
            v-model="state.email"
            :placeholder="$t('pages.auth.placeholders.email')"
            :disabled="isLoading"
          />
        </UFormField>

        <UButton
          class="m-auto w-full justify-center"
          color="primary"
          variant="solid"
          type="submit"
          :loading="isLoading"
          :label="isLoading ? '' : $t('pages.auth.buttons.reset_password')"
        >
        </UButton>
        <UButton
          class="justify-center"
          variant="link"
          color="primary"
          leading-icon="lucide:chevron-left"
          :label="$t('pages.auth.links.back_to_login')"
          @click="navigateTo({ name: 'login' })"
        />
      </UForm>
    </UCard>
  </main>
</template>

<style scoped></style>
