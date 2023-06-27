<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { searchSchemas } from './schemas/search'
import { columns } from './schemas/table'
import Edit from './edit.vue'
import DeptTree from './components/DeptTree.vue'
import DeptTransfer from './components/DeptTransfer.vue'
import { VTableColumnBtn, VTableColumnDeleteBtn } from '@/components/VTable'
import { user } from '@/apis/system/user'

const message = useMessage()

const tableRef = ref()
const editRef = ref()
const deptTreeRef = ref()
const deptTransferRef = ref()
const actionColumn = {
  width: 220,
  render(row: any) {
    return h(NSpace, { align: 'center', justify: 'center' }, () => [
      h(VTableColumnBtn, { type: 'warning', onClick: () => handleTransfer([row.id]) }, () => '转移'),
      h(VTableColumnBtn, { onClick: () => handleEdit(row.id) }, () => '编辑'),
      h(VTableColumnDeleteBtn, { delete: () => handleDelete([row.id]) }),
    ])
  },
}
const searchGiProps = {
  span: 'xs:24 s:12 m:12 l:8',
  offset: 'xs:0 s:0 m:0 l:8',
}

const checkedRowKeys = computed(() => unref(tableRef)?.getCheckedRowKeys() || [])

async function load(params: any) {
  return user.page({ ...params, departmentIds: unref(deptTreeRef).getIds() })
}

function handleAdd() {
  unref(editRef).open({ departmentId: unref(deptTreeRef).getId() })
}

function handleEdit(id: number | string) {
  unref(editRef).open({ edit: true, id })
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

function handleTransfer(ids: number[] | string[]) {
  unref(deptTransferRef).open({ ids })
}

function handleBatchTransfer() {
  handleTransfer(unref(checkedRowKeys))
}

function handleRefresh() {
  unref(tableRef).reload()
}
</script>

<template>
  <div class="m-16px">
    <NGrid
      :x-gap="16"
      :y-gap="16"
      item-responsive
      responsive="screen"
    >
      <NGi span="xs:24 m:8 l:6 xl:4">
        <DeptTree
          ref="deptTreeRef"
          @refresh="handleRefresh"
        />
      </NGi>
      <NGi span="xs:24 m:16 l:18 xl:20">
        <VTable
          ref="tableRef"
          :columns="columns"
          :action-column="actionColumn"
          :search-gi-props="searchGiProps"
          :search-schemas="searchSchemas"
          :load="load"
          :scroll-x="1570"
          :init="false"
        >
          <template #action>
            <VTableAddBtn @click="handleAdd" />
            <VTableBatchDeleteBtn :delete="handleBatchDelete" />
            <NButton
              type="warning"
              :disabled="!checkedRowKeys.length"
              @click="handleBatchTransfer"
            >
              转 移
            </NButton>
          </template>
        </VTable>
      </NGi>
    </NGrid>

    <Edit
      ref="editRef"
      @refresh="handleRefresh"
    />

    <DeptTransfer
      ref="deptTransferRef"
      @refresh="handleRefresh"
    />
  </div>
</template>
