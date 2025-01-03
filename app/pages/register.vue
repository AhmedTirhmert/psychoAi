<script setup lang="ts">
  import type { registerForm } from '~~/types/auth';
  import type { FormSubmitEvent } from '#ui/types';
  import * as v from 'valibot';
  import { useAuthStore } from '~/store/auth';

  const toast = useToast();
  const { t } = useI18n();
  const { register } = useAuthStore();
  const { reset } = useResetObject();
  const showPassword = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const schema = computed(() =>
    v.object({
      username: v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty(t('pages.auth.errors.username_is_required')),
      ),
      fullName: v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty(t('pages.auth.errors.full_name_is_required')),
      ),
      email: v.pipe(v.string(), v.email(t('pages.auth.errors.invalid_email'))),
      password: v.pipe(
        v.string(),
        v.nonEmpty(t('pages.auth.errors.password_is_required')),
        v.minLength(8, t('pages.auth.errors.must_be_at_least_8_characters')),
      ),
      confirm_password: v.pipe(
        v.string(),
        v.nonEmpty(t('pages.auth.errors.confirm_password_is_required')),
        v.check(
          () => state.password === state.confirm_password,
          t('pages.auth.errors.passwords_dont_match'),
        ),
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
  const state = reactive<registerForm>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    accept_terms_and_conditions: false,
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      isLoading.value = true;
      const response = await register(state);
      reset(state);
      toast.add({
        title: t('responses.status.success'),
        icon: 'lucide:mail',
        description: Object.values(response.value).join('\n'),
        color: 'success',
      });
    } catch (error) {
      toast.add({
        title: t('responses.status.error'),
        icon: 'material-symbols:dangerous-outline',
        description: String(error),
        color: 'error',
      });
    } finally {
      isLoading.value = false;
    }
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
        :disabled="isLoading"
      >
        <UFormField :label="$t('pages.auth.labels.full_name')" name="fullName">
          <UInput
            class="block"
            v-model="state.fullName"
            :placeholder="$t('pages.auth.placeholders.full_name')"
          />
        </UFormField>

        <UFormField :label="$t('pages.auth.labels.username')" name="username">
          <UInput
            class="block"
            v-model="state.username"
            :placeholder="$t('pages.auth.placeholders.username')"
            icon="lucide:at-sign"
            :ui="{
              leadingIcon: 'w-4 ',
              base: 'pl-7',
            }"
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

        <UFormField
          :label="$t('pages.auth.labels.confirm_password')"
          name="confirm_password"
        >
          <UInput
            class="block"
            v-model="state.confirm_password"
            :placeholder="$t('pages.auth.placeholders.confirm_password')"
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
