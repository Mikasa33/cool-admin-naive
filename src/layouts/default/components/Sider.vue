<script setup lang="ts">
interface Props {
  headerHeight?: number
}

withDefaults(defineProps<Props>(), {
  headerHeight: 64,
})

const title = import.meta.env.VITE_APP_TITLE

const route = useRoute()
const router = useRouter()
const isDark = useDark()
const menuStore = useMenuStore()
const { width } = useWindowSize()

const collapsed = ref(false)
const menuValue = ref()

watch(
  width,
  (val: number) => {
    collapsed.value = val < 1024
  },
  {
    immediate: true,
  },
)

watch(
  route,
  () => {
    menuValue.value = route.path
  },
  {
    immediate: true,
  },
)

function handleClickLogo() {
  router.push('/')
}

function handleUpdateMenu(key: string, menu: any) {
  if (menu.isFrame) {
    window.open(menu.router)
    return
  }

  router.push(key)
}
</script>

<template>
  <NLayoutSider
    v-model:collapsed="collapsed"
    show-trigger
    :inverted="!isDark"
    collapse-mode="width"
    :collapsed-width="64"
    :width="220"
    class="layout-sider !z-999"
  >
    <div
      class="flex-center cursor-pointer overflow-hidden whitespace-nowrap text-20px"
      :style="{ height: `${headerHeight}px` }"
      @click="handleClickLogo"
    >
      <img
        src="/logo.png"
        class="h-36px w-36px"
      >
      <span
        v-show="!collapsed"
        class="ml-8px font-bold transition-base"
      >
        {{ title }}
      </span>
    </div>
    <NScrollbar
      :style="{ height: `calc(100vh - ${headerHeight}px)` }"
    >
      <NMenu
        :value="menuValue"
        :options="menuStore.list"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="18"
        :icon-size="18"
        :inverted="!isDark"
        :indent="20"
        accordion
        @update:value="handleUpdateMenu"
      />
    </NScrollbar>
  </NLayoutSider>
</template>

<style lang="less" scoped>
.layout-sider {
  box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
}
</style>
