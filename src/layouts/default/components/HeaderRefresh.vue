<script setup lang="ts">
const reloadApp = inject('app-reload') as Function

function handleRefresh() {
  reloadApp()
}
</script>

<template>
  <NButton
    tertiary
    circle
    size="large"
    @click="handleRefresh"
  >
    <template #icon>
      <div class="i-icon-park-outline-redo" />
    </template>
  </NButton>
</template>
