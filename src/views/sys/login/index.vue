<script setup lang="ts">
import { getCaptcha } from '@/apis/open'

const isDark = useDark()
const userStore = useUserStore()
const [isLoading, toggle] = useToggle()

const formRef = ref()

const formRules = {
  username: { required: true, message: '请输入用户名', trigger: ['input'] },
  password: { required: true, message: '请输入密码', trigger: ['input'] },
  verifyCode: { required: true, message: '请输入验证码', trigger: ['input'] },
}

const captcha = ref({
  captchaId: null,
  data: '',
})
const captchaSvg = computed(() => unref(captcha).data?.replace(/#fff/g, unref(isDark) ? '#63e2b7' : '#18a058'))

const form = ref({
  username: 'admin',
  password: '123456',
  verifyCode: null,
  captchaId: computed(() => unref(captcha).captchaId),
})

async function handleRefreshCaptcha() {
  captcha.value = await getCaptcha() as any
}

async function handleLogin() {
  try {
    toggle()
    await unref(formRef).validate()
    await userStore.login(unref(form))
  }
  catch (error) {

  }
  finally {
    toggle()
  }
}

onMounted(() => {
  handleRefreshCaptcha()
})
</script>

<template>
  <div class="h-100vh flex-center">
    <VThemeIcon class="absolute cursor-pointer right-32px top-32px" />

    <NGrid
      item-responsive
      responsive="screen"
      class="h-full"
    >
      <NGi
        span="xs:24 m:12"
        class="flex-center bg-#18a058 dark:bg-#63e2b7"
      >
        <img src="/login.svg">
      </NGi>

      <NGi
        span="xs:24 m:12"
        class="flex-center bg-#fff dark:bg-#101014"
      >
        <div class="my-48px w-50%">
          <div class="flex-center">
            <img
              :src="isDark ? '/logo.png' : '/favicon.ico'"
              class="h-42px"
            >
            <span class="ml-12px text-32px">COOL-ADMIN</span>
          </div>

          <div class="mb-24px mt-16px flex-center">
            <NText :depth="3">
              一款快速开发后台权限管理系统
            </NText>
          </div>

          <NForm
            ref="formRef"
            :model="form"
            :rules="formRules"
            :show-label="false"
          >
            <NFormItem path="username">
              <NInput
                v-model:value="form.username"
                placeholder="请输入用户名"
                size="large"
              >
                <template #prefix>
                  <div class="i-icon-park-outline-user mr-4px" />
                </template>
              </NInput>
            </NFormItem>
            <NFormItem path="password">
              <NInput
                v-model:value="form.password"
                placeholder="请输入密码"
                size="large"
                type="password"
                show-password-on="mousedown"
              >
                <template #prefix>
                  <div class="i-icon-park-outline-lock mr-4px" />
                </template>
              </NInput>
            </NFormItem>
            <NFormItem path="verifyCode">
              <NInput
                v-model:value="form.verifyCode"
                placeholder="请输入验证码"
                size="large"
                :maxlength="4"
                class="captcha"
              >
                <template #prefix>
                  <div class="i-icon-park-outline-protect mr-4px" />
                </template>
                <template #suffix>
                  <div
                    class="h-full cursor-pointer pb-6px"
                    @click="handleRefreshCaptcha"
                    v-html="captchaSvg"
                  />
                </template>
              </NInput>
            </NFormItem>
            <NButton
              :loading="isLoading"
              type="primary"
              block
              size="large"
              @click="handleLogin"
            >
              登 录
            </NButton>
          </NForm>
        </div>
      </NGi>
    </NGrid>
  </div>
</template>

<style lang="less" scoped>
:deep(.captcha) {
  .n-input-wrapper {
    padding-right: 0;
  }
}
</style>
