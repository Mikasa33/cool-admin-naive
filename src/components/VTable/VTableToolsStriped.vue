<script lang="ts" setup>
const emit = defineEmits(['striped'])

const striped = ref(false)

function handleSwitchStriped(val: boolean) {
  emit('striped', val)
}
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <NSwitch
        v-model:value="striped"
        @update:value="handleSwitchStriped"
      />
    </template>
    表格斑马线
  </NTooltip>
</template>
