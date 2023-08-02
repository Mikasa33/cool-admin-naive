<script setup lang="ts">
import { isLayoutComponent } from './helper'
import type { IFormSchemaProps } from './types'

withDefaults(defineProps<IFormSchemaProps>(), {})
</script>

<template>
  <NGrid
    :x-gap="12"
    :y-gap="12"
    v-bind="gridProps"
  >
    <NGi
      v-for="(schema, index) in (items as IFormSchemaProps)"
      :key="index"
      :span="24"
      v-bind="schema.giProps"
    >
      <VFoLayoutComponent
        v-if="isLayoutComponent(schema.component)"
        v-bind="schema"
      />
      <NFormItem
        v-else
        :path="schema.field"
        :label="schema.label"
        v-bind="schema.itemProps"
      >
        <VFoComponent v-bind="schema" />
      </NFormItem>
    </NGi>
  </NGrid>
</template>
