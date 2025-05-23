<script setup lang="ts">
  import * as v from 'valibot';
  import type { FormSubmitEvent } from '#ui/types';

  const { t } = useI18n();
  const { login } = useAuth();
  const toast = useToast();
  const route = useRoute();

  const showPassword = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const schema = computed(() =>
    v.object({
      email_or_username: v.pipe(
        v.string(),
        v.nonEmpty(t('pages.auth.errors.email_or_username_is_required')),
      ),
      password: v.pipe(
        v.string(),
        v.nonEmpty(t('pages.auth.errors.password_is_required')),
      ),
      remember_me: v.pipe(v.boolean()),
    }),
  );

  type Schema = v.InferOutput<typeof schema.value>;

  const state = reactive({
    email_or_username: '',
    password: '',
    remember_me: false,
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      isLoading.value = true;
      await login(state);
      route.query.redirect
        ? navigateTo(String(route.query.redirect))
        : navigateTo('/');
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
    <UCard class="flex flex-col w-[85%] min-w-80 md:w-96">
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
        <UFormField
          :label="$t('pages.auth.labels.email_or_username')"
          name="email_or_username"
        >
          <UInput
            class="block"
            v-model="state.email_or_username"
            :placeholder="$t('pages.auth.placeholders.email_or_username')"
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

        <UFormField name="remember_me">
          <div class="flex items-center justify-between w-full">
            <UCheckbox
              v-model="state.remember_me"
              :label="$t('pages.auth.labels.remember_me')"
            />
            <UButton
              :label="$t('pages.auth.links.forgot_password')"
              variant="link"
              class="p-0"
              @click="navigateTo({ name: 'forgot-password' })"
            />
          </div>
        </UFormField>

        <UButton
          class="m-auto w-full justify-center"
          color="primary"
          variant="solid"
          type="submit"
          :loading="isLoading"
          :label="isLoading ? '' : $t('pages.auth.buttons.sign_in')"
        >
        </UButton>

        <div class="text-center text-sm">
          <span>{{ $t('pages.auth.messages.dont_have_an_account') }}</span>
          <UButton
            variant="link"
            :label="$t('pages.auth.buttons.sign_up')"
            class="px-1"
            @click="navigateTo({ name: 'register' })"
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
