<script lang="ts" setup>
import { vFormGetPropKey } from '../inject'

withDefaults(defineProps<{
  giSpan?: number | string
  children: any[]
}>(), {
  giSpan: 24,
})

const getProp = inject(vFormGetPropKey) as Function
</script>

<template>
  <NGrid v-bind="$attrs">
    <template v-for="(child, index) in children">
      <NGi
        v-if="getProp(child, child.show, true) && getProp(child, child.ifShow, true)"
        v-bind="getProp(child, child.giProps)"
        :key="index"
        :span="child.giProps?.span || giSpan"
      >
        <slot :schema="child" />
      </NGi>
    </template>
  </NGrid>
</template>
