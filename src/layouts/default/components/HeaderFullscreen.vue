<script setup lang="ts">
import HeaderItem from './HeaderItem.vue'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <HeaderItem @click="toggle()">
    <div
      :class="[isFullscreen ? 'i-icon-park-outline-off-screen' : 'i-icon-park-outline-full-screen']"
      class="text-16px"
    />
  </HeaderItem>
</template>
