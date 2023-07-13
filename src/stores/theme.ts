import type { GlobalThemeOverrides } from 'naive-ui'
import { addColorAlpha, getColorPalette } from '@/utils/color'
import storage from '@/utils/storage'

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type ColorKey = `${ColorType}Color${ColorScene}`
type ThemeColor = Partial<Record<ColorKey, string>>
interface ColorAction {
  scene: ColorScene
  handler: (color: string) => string
}

// 获取主题颜色的各种场景对应的颜色
function getThemeColors(colors: [ColorType, string][]) {
  const colorActions: ColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: color => getColorPalette(color, 7) },
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) },
  ]

  const themeColor: ThemeColor = {}

  colors.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color
      const colorKey: ColorKey = `${colorType}Color${action.scene}`
      themeColor[colorKey] = action.handler(colorValue)
    })
  })

  return themeColor
}

function getNaiveThemeOverrides(colors: Record<ColorType, string>): GlobalThemeOverrides {
  const { primary, info, success, warning, error } = colors

  // const info = getColorPalette(primary, 7)

  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error],
  ])

  const colorLoading = primary

  return {
    common: {
      ...themeColors,
    },
    LoadingBar: {
      colorLoading,
    },
  }
}

const otherColor = {
  info: '#2080f0',
  success: '#18a058',
  warning: '#f0a020',
  error: '#d03050',
}

const data = storage.info()

export const useThemeStore = defineStore('theme', () => {
  const [show, toggleShow] = useToggle()

  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const themeColor = ref(data.themeColor || '#18a058')
  const naiveThemeOverrides = computed(() => getNaiveThemeOverrides({ primary: unref(themeColor), ...otherColor }))
  function setThemeColor(val: string) {
    themeColor.value = val
    storage.set('themeColor', val)
  }

  const breadcrumbVisible = ref(data.breadcrumbVisible ?? true)
  function setBreadcrumbVisible(val: boolean) {
    breadcrumbVisible.value = val
    storage.set('breadcrumbVisible', val)
  }

  const pageAnimate = ref(data.pageAnimate ?? true)
  function setPageAnimate(val: boolean) {
    pageAnimate.value = val
    storage.set('pageAnimate', val)
  }

  const pageAnimateMode = ref(data.pageAnimateMode || 'fade-slide')
  const pageAnimateModeVal = computed(() => unref(pageAnimate) ? unref(pageAnimateMode) : undefined)
  function setPageAnimateMode(val: string) {
    pageAnimateMode.value = val
    storage.set('pageAnimateMode', val)
  }

  return {
    show,
    toggleShow,
    isDark,
    toggleDark,
    themeColor,
    naiveThemeOverrides,
    setThemeColor,
    breadcrumbVisible,
    setBreadcrumbVisible,
    pageAnimate,
    setPageAnimate,
    pageAnimateMode,
    pageAnimateModeVal,
    setPageAnimateMode,
  }
})
