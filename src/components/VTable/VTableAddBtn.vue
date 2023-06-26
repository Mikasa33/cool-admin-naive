<script lang="ts" setup>
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <NButton
    type="primary"
    v-bind="$attrs"
    @click="handleClick"
  >
    新 建
  </NButton>
</template>
