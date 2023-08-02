<script lang="ts" setup>
const props = withDefaults(defineProps<{
  items?: any[]
  defaultExpandedNames?: string | number | Array<string | number> | null
}>(), {})

const slots = defineSlots()

const value = ref(props.defaultExpandedNames || props.items?.[0]?.name)
</script>

<template>
  <NCollapse
    v-bind="$attrs"
    v-model:expanded-names="value"
  >
    <template
      v-for="(slot, key) in slots"
      :key="key"
      #[key]="slotProps"
    >
      <template v-if="key === 'default'">
        <NCollapseItem
          v-for="(item, index) in items"
          :key="index"
          v-bind="item"
        >
          <VFoContent :items="item.items" />
        </NCollapseItem>
      </template>

      <Component
        :is="slot"
        v-else
        v-bind="slotProps"
      />
    </template>
  </NCollapse>
</template>
