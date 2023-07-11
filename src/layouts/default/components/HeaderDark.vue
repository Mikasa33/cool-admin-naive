<script setup lang="ts">
const themeStore = useThemeStore()
</script>

<template>
  <NButton
    tertiary
    circle
    size="large"
    @click="themeStore.toggleDark()"
  >
    <template #icon>
      <VThemeIcon @click.stop />
    </template>
  </NButton>
</template>
