<script lang="ts" setup>
defineProps<{
  value?: Array<string | number> | null
  options?: any[]
}>()

const emit = defineEmits(['update:value'])

function handleUpdateValue(val: any) {
  emit('update:value', val)
}
</script>

<template>
  <NCheckboxGroup
    :value="value"
    v-bind="$attrs"
    @update:value="handleUpdateValue"
  >
    <NSpace>
      <NCheckbox
        v-for="(opt, index) in options"
        :key="index"
        v-bind="opt"
      >
        {{ opt.label }}
      </NCheckbox>
    </NSpace>
  </NCheckboxGroup>
</template>
