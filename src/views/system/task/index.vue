<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { searchSchemas } from './schemas/search'
import { columns } from './schemas/table'
import Edit from './edit.vue'
import { VTableColumnBtn, VTableColumnDialogBtn } from '@/components/VTable'
import { task } from '@/apis/system/task'

const message = useMessage()
const { hasPermission } = usePermission()

const tableRef = ref()
const editRef = ref()
const actionColumn = {
  width: 220,
  render(row: any) {
    return h(NSpace, { align: 'center', justify: 'center' }, () => [
      (hasPermission(['task:info:start']) && row.status === 0) && h(VTableColumnBtn, { type: 'success', onClick: () => handleStart(row) }, () => '启动'),
      (hasPermission(['task:info:stop']) && row.status === 1) && h(VTableColumnBtn, { type: 'error', onClick: () => handleStop(row) }, () => '停止'),
      hasPermission(['task:info:update']) && h(VTableColumnBtn, { onClick: () => handleEdit(row.id) }, () => '编辑'),
      hasPermission(['task:info:delete']) && h(VTableColumnDialogBtn, { fn: () => handleDelete([row.id]) }),
    ])
  },
}
const searchGiProps = {
  span: 'xs:24 s:12 m:12 l:8',
  offset: 'xs:0 s:0 m:0 l:8',
}

const checkedRowKeys = computed(() => unref(tableRef)?.getCheckedRowKeys() || [])

async function load(params: any) {
  return task.page({ ...params })
}

function handleAdd() {
  unref(editRef).open()
}

function handleEdit(id: number | string) {
  unref(editRef).open({ edit: true, id })
}

async function handleStart(row: any) {
  try {
    await task.start(row)
    message.success('启动成功')
  }
  catch (err) {

  }
}

async function handleStop(row: any) {
  try {
    await task.stop(row)
    message.success('停止成功')
  }
  catch (err) {

  }
}

async function handleDelete(ids: number[] | string[]) {
  try {
    await task.delete({ ids })
    message.success('删除成功')
    handleRefresh()
  }
  catch (err) {

  }
}

function handleBatchDelete() {
  handleDelete(unref(checkedRowKeys))
}

function handleRefresh() {
  unref(tableRef).reload()
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
      :scroll-x="1000"
    >
      <template #action>
        <VTableBtn
          v-permission="['task:info:add']"
          @click="handleAdd"
        >
          新 建
        </VTableBtn>
        <VTableDialogBtn
          v-permission="['task:info:delete']"
          :fn="handleBatchDelete"
        />
      </template>
    </VTable>

    <Edit
      ref="editRef"
      @refresh="handleRefresh"
    />
  </div>
</template>
