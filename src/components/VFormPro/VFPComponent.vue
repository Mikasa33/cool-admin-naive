<script lang="ts" setup>
import { vFormModel } from '../inject'
import type { IFormSchemaProps } from './types'
import { useHelper } from './hooks/useHelper'
import { getComponent } from './helper'

const props = withDefaults(defineProps<IFormSchemaProps>(), {})

const model = inject(vFormModel) as any

const { getProps, getSlots } = useHelper(props, model)

function handleUpdateValue(val: any) {
  if (props.field)
    model.value[props.field] = val
}
</script>

<template>
  <Component
    :is="getComponent(component)"
    v-bind="getProps()"
    :value="field ? model[field] : null"
    :items="items"
    @update:value="handleUpdateValue"
  >
    <template
      v-for="(slot, key) in getSlots(slots)"
      :key="key"
      #[key]="slotProps"
    >
      <Component
        :is="slot"
        v-bind="slotProps"
      />
    </template>
  </Component>
</template>
