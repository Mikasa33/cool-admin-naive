<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  if (['/403', '/404', '/500', '/502'].includes(route.path))
    return []

  return route.matched.filter((item: any) => item.path && !item.meta?.hideBreadcrumb)
})
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
      :clickable="false"
      class="breadcrumb-item"
    >
      <div class="flex-center">
        <Component
          :is="breadcrumb.meta?.icon"
          class="mr-4px"
        />
        {{ breadcrumb.meta?.title }}
      </div>
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>
