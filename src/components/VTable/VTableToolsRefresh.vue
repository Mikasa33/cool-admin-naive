<script lang="ts" setup>
const emit = defineEmits(['refresh'])

function handleClick() {
  emit('refresh')
}
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <div
        class="i-icon-park-outline-refresh cursor-pointer text-16px transition-base hover:text-[#18a058]"
        @click="handleClick"
      />
    </template>
    刷新
  </NTooltip>
</template>
