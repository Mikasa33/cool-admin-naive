<script setup lang="ts">
interface Props {
  headerHeight?: number
}

withDefaults(defineProps<Props>(), {
  headerHeight: 64,
})

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

function handleUpdateMenu(key: string) {
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
      class="overflow-hidden cursor-pointer flex-center whitespace-nowrap text-20px"
      :style="{ height: `${headerHeight}px` }"
      @click="handleClickLogo"
    >
      <img
        src="/logo.png"
        class="h-32px w-32px"
      >
      <span
        v-show="!collapsed"
        class="font-bold ml-8px transition-base"
      >
        COOL-ADMIN
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
