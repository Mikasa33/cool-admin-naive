<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { searchSchemas } from './schemas/search'
import { columns } from './schemas/table'
import { user } from '@/apis/user/user'
import { VTableColumnDialogBtn } from '@/components/VTable'

const message = useMessage()
const { hasPermission } = usePermission()

const tableRef = ref()
const actionColumn = {
  width: 100,
  render(row: any) {
    return h(NSpace, { align: 'center', justify: 'center' }, () => [
      hasPermission(['user:info:delete']) && h(VTableColumnDialogBtn, { fn: () => handleDelete([row.id]) }),
    ])
  },
}
const searchGiProps = {
  span: 'xs:24 s:12 m:12 l:8',
  offset: 'xs:0 s:0 m:0 l:16',
}

const checkedRowKeys = computed(() => unref(tableRef)?.getCheckedRowKeys() || [])

async function load(params: any) {
  return user.page({ ...params })
}

function handleRefresh() {
  unref(tableRef).reload()
}

async function handleDelete(ids: number[] | string[]) {
  try {
    await user.delete({ ids })
    message.success('删除成功')
    handleRefresh()
  }
  catch (err) {

  }
}

function handleBatchDelete() {
  handleDelete(unref(checkedRowKeys))
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
      :scroll-x="970"
    >
      <template #action>
        <VTableDialogBtn
          v-permission="['user:info:delete']"
          :fn="handleBatchDelete"
        />
      </template>
    </VTable>
  </div>
</template>
