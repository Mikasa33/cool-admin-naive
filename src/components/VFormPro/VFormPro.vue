<script setup lang="ts">
import { vFormModel } from '../inject'
import type { IFormProps } from './types'

withDefaults(defineProps<IFormProps>(), {})

const formRef = ref()

const model = ref({})

provide(vFormModel, model)
</script>

<template>
  <NForm
    ref="formRef"
    label-placement="left"
    v-bind="formProps"
  >
    <VFoContent
      :grid-props="gridProps"
      :items="schemas"
    />
  </NForm>
</template>
