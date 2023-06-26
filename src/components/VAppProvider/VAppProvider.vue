<script setup lang="ts">
import { darkTheme, dateZhCN, lightTheme, zhCN } from 'naive-ui'

const isDark = useDark()
const theme = computed(() => unref(isDark) ? darkTheme : lightTheme)
const themeOverrides = null
const locale = zhCN
const dateLocale = dateZhCN
</script>

<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <NDialogProvider>
      <NLoadingBarProvider>
        <NMessageProvider>
          <NNotificationProvider>
            <slot />
          </NNotificationProvider>
        </NMessageProvider>
      </NLoadingBarProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
