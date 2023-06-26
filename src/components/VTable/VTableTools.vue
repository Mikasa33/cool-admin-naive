<script lang="ts" setup>
import type { DataTableColumn } from 'naive-ui'

withDefaults(defineProps<{
  columns: DataTableColumn[]
}>(), {
  columns: () => [],
})

const emit = defineEmits(['update:columns', 'resetColumns', 'striped', 'refresh', 'density'])

function handleSetting(name: 'striped' | 'refresh' | 'density' | 'update:columns' | 'resetColumns', val?: any) {
  emit(name, val)
}
</script>

<template>
  <NSpace
    align="center"
    justify="end"
  >
    <VTableToolsStriped @striped="(val: boolean) => handleSetting('striped', val)" />
    <NDivider vertical />
    <VTableToolsRefresh @refresh="() => handleSetting('refresh')" />
    <VTableToolsDensity @setting="(val: string) => handleSetting('density', val)" />
    <VTableToolsColumn
      :columns="columns"
      @update:columns="(val: any) => handleSetting('update:columns', val)"
      @resetColumns="() => handleSetting('resetColumns')"
    />
  </NSpace>
</template>
