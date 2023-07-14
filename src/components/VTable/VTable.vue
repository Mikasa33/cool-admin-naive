<script setup lang="ts">
import type { DataTableColumn, FormItemGiProps, PaginationProps } from 'naive-ui'
import { NSpace } from 'naive-ui'
import { vTableCheckedRowKey } from '../inject'
import { useCheckedRow } from './hooks/useCheckedRow'
import { useColumn } from './hooks/useColumn'
import { useHeight } from './hooks/useHeight'
import { usePagination } from './hooks/usePagination'
import { useSort } from './hooks/useSort'
import { useTableTools } from './hooks/useTableTools'

export interface Props {
  rowKey?: string
  columns?: DataTableColumn[] | any
  actionColumn?: DataTableColumn | any
  useSearch?: boolean
  searchGiProps?: FormItemGiProps
  searchSchemas?: Array<any>
  useTools?: boolean
  striped?: boolean
  size?: 'medium' | 'small' | 'large'
  pagination?: PaginationProps | boolean
  load: Function
  init?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  actionColumn: undefined,
  useSearch: true,
  searchSchemas: () => [],
  useTools: true,
  striped: false,
  size: 'medium',
  pagination: undefined,
  init: true,
})

const searchRef = ref()
const searchParams = computed(() => searchRef.value?.getFieldsValue() || {})

const tableRef = ref()
const { height } = useHeight(tableRef)
const { defaultColumns, filterColumns, handleResetColumns } = useColumn(props)
const { defaultPagination, mergePagination, paginationParams } = usePagination(props, load)
const { sort, handleUpdateSorter } = useSort(defaultColumns, reload)
const { checkedRowKeys, getCheckedRowKeys, setCheckedRowKeys } = useCheckedRow()
const { striped, size, handleStriped, handleDensity } = useTableTools(props)
const [loading, toggleLoading] = useToggle()
const data = ref<any[]>([])

function getRowKey(row: any) {
  return row[props.rowKey]
}

async function load(params?: any) {
  checkedRowKeys.value = []
  try {
    toggleLoading(true)
    const { list, pagination } = await props.load({ ...unref(paginationParams), ...unref(sort), ...unref(searchParams), ...params })
    data.value = list
    defaultPagination.itemCount = pagination.total
  }
  catch (err) {

  }
  finally {
    toggleLoading(false)
  }
}

async function reload(params?: any) {
  defaultPagination.page = 1
  await load(params)
}

onMounted(() => {
  props.init && load()
})

provide(vTableCheckedRowKey, checkedRowKeys)

defineExpose({
  getCheckedRowKeys,
  setCheckedRowKeys,
  load,
  reload,
})
</script>

<template>
  <div>
    <VTableSearch
      v-if="useSearch && searchSchemas.length"
      ref="searchRef"
      use-search
      :search-gi-props="searchGiProps"
      :search-schemas="searchSchemas"
      :loading="loading"
      class="mb-16px"
      @search="load"
    />
    <NCard
      size="small"
      :bordered="false"
    >
      <template #header>
        <NSpace
          align="center"
          justify="space-between"
        >
          <div class="actions flex items-center">
            <slot name="action" />
          </div>
          <VTableTools
            v-if="useTools"
            v-model:columns="defaultColumns"
            @striped="handleStriped"
            @refresh="load"
            @density="handleDensity"
            @resetColumns="handleResetColumns"
          />
        </NSpace>
      </template>
      <NDataTable
        ref="tableRef"
        v-bind="$attrs"
        v-model:checked-row-keys="checkedRowKeys"
        :row-key="getRowKey"
        :columns="filterColumns"
        :loading="loading"
        :data="data"
        :pagination="mergePagination"
        :striped="striped"
        :size="size"
        remote
        flex-height
        :style="{
          height: `${height}px`,
          minHeight: '300px',
        }"
        @update:sorter="handleUpdateSorter"
      />
    </NCard>
  </div>
</template>

<style lang="less" scoped>
.actions {
  :deep(.n-button) {
    margin-right: 12px;
  }
}
</style>
