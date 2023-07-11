<script setup lang="ts">
function handleClick() {
  window.open('https://github.com/Mikasa33/cool-admin-naive')
}
</script>

<template>
  <NButton
    tertiary
    circle
    size="large"
    @click="handleClick"
  >
    <template #icon>
      <div class="i-icon-park-outline-github-one text-17px" />
    </template>
  </NButton>
</template>
