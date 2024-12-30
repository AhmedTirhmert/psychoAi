<script setup lang="ts">
  import * as v from 'valibot';
  import type { FormSubmitEvent } from '#ui/types';
  const showPassword = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const { t } = useI18n();
  const schema = computed(() =>
    v.object({
      name: v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty(t('pages.auth.errors.name_is_required')),
      ),
      email: v.pipe(v.string(), v.email(t('pages.auth.errors.invalid_email'))),
      password: v.pipe(
        v.string(),
        v.nonEmpty(t('pages.auth.errors.password_is_required')),
        v.minLength(8, t('pages.auth.errors.must_be_at_least_8_characters')),
      ),
      accept_terms_and_conditions: v.pipe(
        v.boolean(),
        v.check(
          (accept_terms_and_conditions) => accept_terms_and_conditions === true,
          t('pages.auth.errors.you_must_agree_to_terms_and_conditions'),
        ),
      ),
    }),
  );
  // const alert = (message: string) => window.alert(message);
  type Schema = v.InferOutput<typeof schema.value>;

  const state = reactive({
    name: '',
    email: '',
    password: '',
    accept_terms_and_conditions: false,
  });
  const toast = useToast();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      toast.add({
        icon: 'lucide:mail-check',
        title: t('responses.status.success'),
        description: t('responses.messages.verification_email_has_been_sent'),
      });
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
        <span class="font-bold text-3xl block mb-4">PsychoAI</span>
      </div>
      <UForm
        :schema="v.safeParser(schema)"
        :state="state"
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UFormField :label="$t('pages.auth.labels.name')" name="name">
          <UInput
            class="block"
            v-model="state.name"
            :placeholder="$t('pages.auth.placeholders.name')"
          />
        </UFormField>
        <UFormField :label="$t('pages.auth.labels.email')" name="email">
          <UInput
            class="block"
            v-model="state.email"
            :placeholder="$t('pages.auth.placeholders.email')"
          />
        </UFormField>

        <UFormField :label="$t('pages.auth.labels.password')" name="password">
          <UInput
            class="block"
            v-model="state.password"
            :placeholder="$t('pages.auth.placeholders.password')"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField name="accept_terms_and_conditions">
          <UCheckbox
            v-model="state.accept_terms_and_conditions"
            class="items-center"
            :ui="{ label: 'text-xs' }"
            :label="$t('pages.auth.buttons.terms_and_conditions')"
          />
        </UFormField>

        <UButton
          class="m-auto w-full justify-center"
          color="primary"
          variant="solid"
          type="submit"
          :loading="isLoading"
          :label="isLoading ? '' : $t('pages.auth.buttons.sign_up')"
        >
        </UButton>

        <div class="text-center text-sm">
          <span>{{ $t('pages.auth.messages.already_have_an_account') }}</span>
          <UButton
            variant="link"
            :label="$t('pages.auth.buttons.sign_in')"
            class="px-1"
            @click="navigateTo({ name: 'login' })"
          />
        </div>

        <USeparator
          class="my-"
          :label="$t('pages.auth.messages.continue_with')"
          size="lg"
          :ui="{ label: 'text-xs font-medium' }"
        />
        <div class="flex items-center justify-center mx-auto gap-2">
          <UButton
            leading-icon="simple-icons:google"
            class="justify-center"
            variant="soft"
            color="neutral"
            :ui="{
              leadingIcon: '',
            }"
          />
          <!-- @click="alert('GOOGLE')" -->
          <UButton
            leading-icon="simple-icons:facebook"
            class="justify-center"
            variant="soft"
            color="neutral"
            :ui="{
              leadingIcon: 'text-xl',
            }"
          />
        </div>
      </UForm>
    </UCard>
  </main>
</template>

<style scoped></style>
