<script setup lang="ts">
import { isFunction } from 'lodash-es'
import type { FormProps } from 'naive-ui'
import { vFormGetPropKey, vFormModel } from '../inject'
import { componentMap } from './componentMap'

defineProps<{
  schema: any
  formProps?: FormProps
}>()

const model = inject(vFormModel) as any
const getProp = inject(vFormGetPropKey) as Function

function isSelectComponent(component: string) {
  return ['NCascader', 'NDatePicker', 'VIconSelect', 'VSelect', 'VTreeSelect'].includes(component)
}

function isSelfLoopComponent(component: string) {
  return ['VGrid', 'VTabs'].includes(component)
}

function getComponent(schema: any) {
  let { component, field } = schema

  if (isFunction(component))
    component = component({ model: unref(model), field })

  return componentMap.get(component)
}

function getComponentProps(schema: any) {
  let { label, component, componentProps } = schema

  if (isFunction(componentProps))
    componentProps = componentProps({ model: unref(model), field: schema.field })

  if (!componentProps)
    componentProps = {}

  const { placeholder } = componentProps
  if (!placeholder) {
    componentProps.placeholder = `请输入${label ?? ''}`

    if (isSelectComponent(component))
      componentProps.placeholder = `请选择${label ?? ''}`
  }

  if (isSelfLoopComponent(component))
    componentProps.children = schema.children

  return componentProps
}

function getSlots(schema: any, slots: any) {
  if (isFunction(slots))
    slots = slots({ model: unref(model), field: schema.field })

  if (!slots)
    slots = {}

  return slots
}
</script>

<template>
  <NFormItem
    v-if="getProp(schema, schema.show, true) && getProp(schema, schema.ifShow, true)"
    v-bind="getProp(schema, schema.itemProps)"
    :path="schema.field"
    :rule="getProp(schema, schema.rules)"
  >
    <template
      v-if="getProp(schema, schema.showLabel, true)"
      #label
    >
      <NSpace
        size="small"
        :justify="formProps?.labelAlign === 'left' ? 'start' : 'end'"
      >
        <Component
          :is="getSlots(schema, schema.labelPrefix)"
          v-if="schema.labelPrefix"
        />
        {{ schema.label }}
      </NSpace>
    </template>
    <slot
      v-if="schema.slot"
      :name="schema.slot"
      :model="model"
      :field="schema.field"
    />
    <Component
      :is="getComponent(schema)"
      v-else-if="isSelfLoopComponent(schema.component)"
      v-bind="getComponentProps(schema)"
      :children="schema.children"
    >
      <template #default="{ schema: sc }">
        <VFormItem
          :schema="sc"
          :form-props="formProps"
        />
      </template>
    </Component>
    <Component
      :is="getComponent(schema)"
      v-else
      v-bind="getComponentProps(schema)"
      v-model:value="model[schema.field]"
      clearable
    >
      <template
        v-for="(slot, key, slotIndex) in getSlots(schema, schema.componentSlots)"
        :key="slotIndex"
        #[key]="props"
      >
        <Component
          :is="slot"
          v-bind="props"
        />
      </template>
      <template
        v-if="schema.children && schema.children.length"
        #default
      >
        <VFormItem
          v-for="(childSchema, childIndex) in schema.children"
          :key="childIndex"
          :schema="childSchema"
          :form-props="formProps"
        />
      </template>
    </Component>
  </NFormItem>
</template>
