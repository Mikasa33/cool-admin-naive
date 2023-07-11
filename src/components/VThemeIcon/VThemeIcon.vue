<script setup lang="ts">
const themeStore = useThemeStore()
</script>

<template>
  <div
    :class="[themeStore.isDark ? 'i-icon-park-outline-moon' : 'i-icon-park-outline-sun-one']"
    class="text-16px"
    @click="themeStore.toggleDark()"
  />
</template>
