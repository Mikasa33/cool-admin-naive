<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { orderBy } from 'lodash-es'
import { searchSchemas } from './schemas/search'
import { columns } from './schemas/table'
import Edit from './edit.vue'
import DictType from './components/DictType.vue'
import { VTableColumnBtn, VTableColumnDialogBtn } from '@/components/VTable'
import { dictInfo } from '@/apis/system/dict'
import { deepTree } from '@/utils'

const message = useMessage()
const { hasPermission } = usePermission()

const dictTypeRef = ref()
const tableRef = ref()
const editRef = ref()
const actionColumn = {
  width: 220,
  render(row: any) {
    return h(NSpace, { align: 'center', justify: 'center' }, () => [
      hasPermission(['dict:info:add']) && h(VTableColumnBtn, { type: 'info', onClick: () => handleAdd({ parentId: row.id }) }, () => '新增'),
      hasPermission(['dict:info:update']) && h(VTableColumnBtn, { onClick: () => handleEdit(row.id) }, () => '编辑'),
      hasPermission(['dict:info:delete']) && h(VTableColumnDialogBtn, { fn: () => handleDelete([row.id]) }),
    ])
  },
}
const searchGiProps = {
  span: 'xs:24 s:12 m:12 l:8',
  offset: 'xs:0 s:0 m:0 l:8',
}

const checkedRowKeys = computed(() => unref(tableRef)?.getCheckedRowKeys() || [])

async function load(params: any) {
  const list = await dictInfo.list({ ...params, typeId: getTypeId() })
  return {
    list: orderBy(deepTree(list), ['orderNum'], [params.sort]),
  }
}

function getTypeId() {
  return Number(unref(dictTypeRef).getIds()?.toString())
}

function handleAdd(record?: any) {
  unref(editRef).open({ ...record, typeId: getTypeId() })
}

function handleEdit(id: number | string) {
  unref(editRef).open({ edit: true, id, typeId: getTypeId() })
}

async function handleDelete(ids: number[] | string[]) {
  try {
    await dictInfo.delete({ ids })
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
    <NGrid
      :x-gap="16"
      :y-gap="16"
      item-responsive
      responsive="screen"
    >
      <NGi span="xs:24 m:8 l:6 xl:4">
        <DictType
          ref="dictTypeRef"
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
          :pagination="false"
          :load="load"
          :scroll-x="990"
          :init="false"
        >
          <template #action>
            <VTableBtn
              v-permission="['dict:info:add']"
              @click="handleAdd"
            >
              新 建
            </VTableBtn>
            <VTableDialogBtn
              v-permission="['dict:info:delete']"
              :fn="handleBatchDelete"
            />
          </template>
        </VTable>
      </NGi>
    </NGrid>

    <Edit
      ref="editRef"
      @refresh="handleRefresh"
    />
  </div>
</template>
