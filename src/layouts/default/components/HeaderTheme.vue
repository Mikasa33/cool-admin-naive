<script setup lang="ts">
import HeaderItem from './HeaderItem.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <HeaderItem @click="toggleDark()">
    <VThemeIcon @click.stop />
  </HeaderItem>
</template>
