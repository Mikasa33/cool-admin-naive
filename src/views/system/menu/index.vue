<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { columns } from './schemas/table'
import Edit from './edit.vue'
import { VTableColumnBtn, VTableColumnDialogBtn } from '@/components/VTable'
import { deepTree } from '@/utils'
import { menu } from '@/apis/system/menu'

const message = useMessage()
const { hasPermission } = usePermission()

const tableRef = ref()
const editRef = ref()
const actionColumn = {
  width: 220,
  render(row: any) {
    return h(NSpace, { align: 'center', justify: 'center' }, () => [
      row.type !== 2 && hasPermission(['base:sys:menu:add']) && h(VTableColumnBtn, { type: 'info', onClick: () => handleAdd({ parentId: row.id }) }, () => '新增'),
      hasPermission(['base:sys:menu:update']) && h(VTableColumnBtn, { onClick: () => handleEdit(row.id) }, () => '编辑'),
      hasPermission(['base:sys:menu:delete']) && h(VTableColumnDialogBtn, { fn: () => handleDelete([row.id]) }),
    ])
  },
}
const checkedRowKeys = computed(() => unref(tableRef)?.getCheckedRowKeys() || [])

async function load() {
  const list = await menu.list()

  list.forEach((item: any) => {
    item.permList = item.perms ? item.perms.split(',') : []
  })

  return {
    list: deepTree(list),
  }
}

function handleAdd(record?: any) {
  unref(editRef).open(record)
}

function handleEdit(id: number | string) {
  unref(editRef).open({ edit: true, id })
}

async function handleDelete(ids: number[] | string[]) {
  try {
    await menu.delete({ ids })
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
      :pagination="false"
      :load="load"
      :scroll-x="1390"
    >
      <template #action>
        <VTableBtn
          v-permission="['base:sys:menu:add']"
          @click="handleAdd"
        >
          新建
        </VTableBtn>
        <VTableDialogBtn
          v-permission="['base:sys:menu:delete']"
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
