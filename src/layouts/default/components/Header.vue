<script setup lang="ts">
import HeaderBreadcrumb from './HeaderBreadcrumb.vue'
import HeaderDark from './HeaderDark.vue'
import HeaderFullscreen from './HeaderFullscreen.vue'
import HeaderGithub from './HeaderGithub.vue'
import HeaderRefresh from './HeaderRefresh.vue'
import HeaderTheme from './HeaderTheme.vue'
import HeaderUserInfo from './HeaderUserInfo.vue'

interface Props {
  height?: number
}

withDefaults(defineProps<Props>(), {
  height: 64,
})
</script>

<template>
  <NLayoutHeader
    position="absolute"
    class="layout-header z-998 flex-y-center"
    :style="{ height: `${height}px` }"
  >
    <div class="h-full w-full flex items-center justify-between px-16px">
      <NSpace align="center">
        <HeaderRefresh />
        <HeaderBreadcrumb />
      </NSpace>
      <NSpace align="center">
        <HeaderGithub />
        <HeaderFullscreen />
        <HeaderDark />
        <HeaderTheme />
        <HeaderUserInfo />
      </NSpace>
    </div>
  </NLayoutHeader>
</template>

<style lang="less" scoped>
.layout-header {
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  :deep(.breadcrumb-item) {
    .n-breadcrumb-item__link {
      color: var(--n-item-text-color-active) !important;
    }
  }
}
</style>
