<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div
    :class="[isDark ? 'i-icon-park-outline-moon' : 'i-icon-park-outline-sun-one']"
    class="text-16px"
    @click="toggleDark()"
  />
</template>
