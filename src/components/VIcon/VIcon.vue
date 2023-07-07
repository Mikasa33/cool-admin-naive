<script setup lang="ts">
defineProps<{
  icon: string
}>()
</script>

<template>
  <div :class="icon" />
</template>
