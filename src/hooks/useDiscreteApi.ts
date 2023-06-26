import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, darkTheme, lightTheme } from 'naive-ui'

export function useDiscreteApi() {
  const isDark = useDark()

  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    theme: unref(isDark) ? darkTheme : lightTheme,
  }))

  const { dialog, loadingBar, message, notification } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProviderPropsRef,
    },
  )

  return {
    dialog,
    loadingBar,
    message,
    notification,
  }
}
