<script setup lang="ts">
import { clone, isFunction, isUndefined } from 'lodash-es'
import type { FormProps, GridProps } from 'naive-ui'
import { vFormGetProp, vFormModel } from '../inject'

interface Props {
  loading?: boolean
  giProps?: GridProps
  giSpan?: number | string
  formProps?: FormProps
}

withDefaults(defineProps<Props>(), {
  giSpan: 'xs:24 s:12',
})

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

    if (schema?.hook?.set) {
      try {
        schema.hook.set({ model: val })
      }
      catch (err: any) {
        console.error(`${schema.field} 执行 hook.set 失败`)
      }
    }

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

provide(vFormModel, model)
provide(vFormGetProp, getProp)

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
      <VGrid
        v-bind="giProps"
        :children="schemas"
        :gi-span="giSpan"
        :x-gap="16"
        item-responsive
        responsive="screen"
      >
        <template #default="{ schema }">
          <VFormItem
            :schema="schema"
            :form-props="formProps"
          >
            <template
              v-for="(slot, key, index) in ($slots as any)"
              :key="index"
              #[key]="props"
            >
              <Component
                :is="slot"
                v-bind="props"
              />
            </template>
          </VFormItem>
        </template>
      </VGrid>
    </NForm>
  </NSpin>
</template>
