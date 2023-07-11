<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <NButton
    tertiary
    circle
    size="large"
    @click="toggle()"
  >
    <template #icon>
      <div
        :class="[isFullscreen ? 'i-icon-park-outline-off-screen' : 'i-icon-park-outline-full-screen']"
        class="text-16px"
      />
    </template>
  </NButton>
</template>
