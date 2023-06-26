<script setup lang="ts">
const isDark = useDark()
</script>

<template>
  <NLayout>
    <NLayoutContent :content-style="{ minHeight: '100vh', backgroundColor: isDark ? '#101014' : '#f0f2f5' }">
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>
