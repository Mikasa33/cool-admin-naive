<script lang="ts" setup>
import { NRadio, NRadioButton } from 'naive-ui'

const props = defineProps<{
  value?: string | number | null
  options?: any[]
  type?: 'group' | null
}>()

const emit = defineEmits(['update:value'])

function handleUpdateValue(val: any) {
  emit('update:value', val)
}

function getComponent() {
  return props.type === 'group' ? NRadioButton : NRadio
}
</script>

<template>
  <NRadioGroup
    :value="value"
    v-bind="$attrs"
    @update:value="handleUpdateValue"
  >
    <NSpace v-if="props.type !== 'group'">
      <Component
        :is="getComponent()"
        v-for="(opt, index) in options"
        :key="index"
        v-bind="opt"
      >
        {{ opt.label }}
      </Component>
    </NSpace>
    <template v-else>
      <Component
        :is="getComponent()"
        v-for="(opt, index) in options"
        :key="index"
        v-bind="opt"
      >
        {{ opt.label }}
      </Component>
    </template>
  </NRadioGroup>
</template>
