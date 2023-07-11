<script setup lang="ts">
const route = useRoute()
const themeStore = useThemeStore()

const breadcrumbs = computed(() => {
  if (['/403', '/404', '/500', '/502'].includes(route.path))
    return []

  return route.matched.filter((item: any) => item.path && !item.meta?.hideBreadcrumb)
})
</script>

<template>
  <div
    v-show="themeStore.breadcrumbVisible"
    class="h-40px flex-center rounded-40px bg-[rgba(46,51,56,.05)] px-16px"
  >
    <NBreadcrumb>
      <NBreadcrumbItem
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :clickable="false"
        class="breadcrumb-item"
      >
        {{ breadcrumb.meta?.title }}
      </NBreadcrumbItem>
    </NBreadcrumb>
  </div>
</template>
