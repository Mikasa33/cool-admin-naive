<script setup lang="ts">
const themeStore = useThemeStore()
</script>

<template>
  <NButton
    tertiary
    circle
    size="large"
    @click="themeStore.toggleShow()"
  >
    <template #icon>
      <div class="i-icon-park-outline-setting-one" />
    </template>
  </NButton>
</template>
