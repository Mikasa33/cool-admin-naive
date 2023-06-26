<script lang="ts" setup>
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <NButton
    size="small"
    type="primary"
    tertiary
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </NButton>
</template>
