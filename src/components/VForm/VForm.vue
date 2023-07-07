<script setup lang="ts">
import { clone, isFunction, isUndefined } from 'lodash-es'
import { type FormProps, type GridProps, useMessage } from 'naive-ui'
import { componentMap } from './componentMap'

export interface Props {
  loading?: boolean
  giProps?: GridProps
  giSpan?: number | string
  formProps?: FormProps
}

withDefaults(defineProps<Props>(), {
  giSpan: 'xs:24 s:12',
})

const message = useMessage()

const formRef = ref()
const model = ref<any>({})
const schemas = ref<any[]>([])

function init(scs: any[]) {
  if (scs)
    schemas.value = scs

  model.value = {}
  unref(schemas)?.forEach((schema: any) => {
    if (schema.field)
      model.value[schema.field] = schema.defaultValue ?? (schema.component === 'NDynamicTags' ? [] : null)
  })
}

function reset(scs?: any[]) {
  init(scs || unref(schemas))
  formRef.value.restoreValidation()
}

async function validate() {
  try {
    await formRef.value.validate()
  }
  catch (error: any) {
    message.error('表单验证失败')
    throw new Error(error)
  }
}

function getFieldsValue() {
  const cloneModel = clone(unref(model))

  for (let i = 0; i < unref(schemas).length; i++) {
    const schema = unref(schemas)[i]

    if (!getProp(schema, schema.ifShow, true)) {
      // cloneModel[schema.field] = null
      delete cloneModel[schema.field]
      continue
    }

    if (schema?.hook?.get)
      schema.hook.get({ model: cloneModel })
  }

  return cloneModel
}

function setFieldsValue(val: any) {
  for (const key in val) {
    const schema = unref(schemas).find((schema: any) => schema.field === key)

    // if (!schema || !getProp(schema, schema.ifShow, true))
    //   continue

    if (!schema)
      continue

    if (schema?.hook?.set)
      schema.hook.set({ model: val })

    model.value[schema.field] = val[schema?.field]
  }
}

function getProp(schema: any, prop: any, defaultValue?: any) {
  if (isUndefined(prop) && !isUndefined(defaultValue))
    return defaultValue

  if (isFunction(prop))
    prop = prop({ model: unref(model), field: schema.field })

  return prop
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

    if (['NCascader', 'NDatePicker', 'VIconSelect', 'VSelect', 'VTreeSelect'].includes(component))
      componentProps.placeholder = `请选择${label ?? ''}`
  }

  return componentProps
}

function getSlots(schema: any, slots: any) {
  if (isFunction(slots))
    slots = slots({ model: unref(model), field: schema.field })

  if (!slots)
    slots = {}

  return slots
}

defineExpose({
  init,
  reset,
  validate,
  getFieldsValue,
  setFieldsValue,
})
</script>

<template>
  <NSpin :show="loading">
    <NForm
      ref="formRef"
      :model="model"
      label-placement="left"
      label-width="120px"
      require-mark-placement="left"
      v-bind="formProps"
    >
      <NGrid
        :x-gap="16"
        item-responsive
        responsive="screen"
        v-bind="giProps"
      >
        <template v-for="(schema, schemaIndex) in schemas">
          <NFormItemGi
            v-if="getProp(schema, schema.show, true) && getProp(schema, schema.ifShow, true)"
            v-bind="{
              ...getProp(schema, schema.giProps),
              ...getProp(schema, schema.itemProps),
            }"
            :key="schemaIndex"
            :path="schema.field"
            :rule="getProp(schema, schema.rules)"
            :span="schema.giProps?.span || giSpan"
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
            </Component>
          </NFormItemGi>
        </template>
      </NGrid>
    </NForm>
  </NSpin>
</template>
