<script setup lang="ts">
import { ref } from 'vue'

const src = ref('https://www.naiveui.com/zh-CN/light/')
</script>

<template>
  <div class="m-16px h-[calc(100vh-64px-32px)] overflow-hidden rounded-3px">
    <iframe
      class="wh-full"
      :src="src"
    />
  </div>
</template>
