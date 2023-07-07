<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { searchSchemas } from './schemas/search'
import { columns } from './schemas/table'
import { recycle } from '@/apis/system/recycle'
import { VTableColumnBtn } from '@/components/VTable'

const message = useMessage()
const { hasPermission } = usePermission()

const tableRef = ref()
const actionColumn = {
  width: 100,
  render(row: any) {
    return h(NSpace, { align: 'center', justify: 'center' }, () => [
      hasPermission(['recycle:data:restore']) && h(VTableColumnBtn, { onClick: () => handleRestore([row.id]) }, () => '恢复'),
    ])
  },
}
const searchGiProps = {
  span: 'xs:24 s:12 m:12 l:8',
  offset: 'xs:0 s:0 m:0 l:8',
}

const checkedRowKeys = computed(() => unref(tableRef)?.getCheckedRowKeys() || [])

async function load(params: any) {
  return recycle.page({ ...params })
}

function handleRefresh() {
  unref(tableRef).reload()
}

async function handleRestore(ids: string[] | number[]) {
  try {
    await recycle.restore({ ids })
    message.success('恢复成功')
    handleRefresh()
  }
  catch (err) {

  }
}

function handleBatchRestore() {
  handleRestore(unref(checkedRowKeys))
}
</script>

<template>
  <div class="m-16px">
    <VTable
      ref="tableRef"
      :columns="columns"
      :action-column="actionColumn"
      :search-gi-props="searchGiProps"
      :search-schemas="searchSchemas"
      :load="load"
      :scroll-x="1280"
    >
      <template #action>
        <VTableDialogBtn
          v-permission="['recycle:data:restore']"
          type="primary"
          :disabled="!checkedRowKeys.length"
          :fn="handleBatchRestore"
        >
          恢复数据
        </VTableDialogBtn>
      </template>
    </VTable>
  </div>
</template>
