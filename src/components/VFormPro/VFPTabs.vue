<script lang="ts" setup>
const props = withDefaults(defineProps<{
  items?: any[]
  defaultValue?: string | number
}>(), {})

const slots = defineSlots()

const value = ref(props.defaultValue || props.items?.[0]?.name)
</script>

<template>
  <NTabs
    v-bind="$attrs"
    v-model:value="value"
  >
    <template
      v-for="(slot, key) in slots"
      :key="key"
      #[key]="slotProps"
    >
      <template v-if="key === 'default'">
        <NTabPane
          v-for="(item, index) in items"
          :key="index"
          display-directive="show:lazy"
          v-bind="item"
        >
          <VFoContent :items="item.items" />
        </NTabPane>
      </template>

      <Component
        :is="slot"
        v-else
        v-bind="slotProps"
      />
    </template>
  </NTabs>
</template>
