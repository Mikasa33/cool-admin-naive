<script setup lang="ts">
import { appReloadKey } from './inject'

const reloadApp = inject(appReloadKey) as Function

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
