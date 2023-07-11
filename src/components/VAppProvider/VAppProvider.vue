<script setup lang="ts">
import { darkTheme, dateZhCN, lightTheme, zhCN } from 'naive-ui'

const themeStore = useThemeStore()
const theme = computed(() => unref(themeStore.isDark) ? darkTheme : lightTheme)
const locale = zhCN
const dateLocale = dateZhCN

// 挂载 naive 组件的方法至  window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools()
  },
  render() {
    return h('div')
  },
})
</script>

<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeStore.naiveThemeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <NDialogProvider>
      <NLoadingBarProvider>
        <NMessageProvider>
          <NNotificationProvider>
            <slot />
            <NaiveProviderContent />
          </NNotificationProvider>
        </NMessageProvider>
      </NLoadingBarProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
