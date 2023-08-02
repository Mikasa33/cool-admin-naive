<script lang="ts" setup>
import { vFormModel } from '../inject'
import type { IFormSchemaProps } from './types'
import { useHelper } from './hooks/useHelper'
import { getComponent, isNestComponentType } from './helper'

const props = withDefaults(defineProps<IFormSchemaProps>(), {})

const model = inject(vFormModel) as any

const { getProps, getSlots } = useHelper(props, model)
</script>

<template>
  <Component
    :is="getComponent(component)"
    v-bind="getProps()"
    :items="items"
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

    <VFoContent
      v-if="!isNestComponentType(component)"
      :items="items"
    />
  </Component>
</template>
