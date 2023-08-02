<script lang="ts" setup>
import { vFormGetProp } from '../inject'

withDefaults(defineProps<{
  children: any[]
}>(), {
})

const getProp = inject(vFormGetProp) as Function
</script>

<template>
  <NTabs v-bind="$attrs">
    <NTabPane
      v-for="(child, index) in children"
      v-bind="getProp(child, child.tabProps)"
      :key="index"
    >
      <slot :schema="child" />
    </NTabPane>
  </NTabs>
</template>
