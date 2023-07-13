<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { searchSchemas } from './schemas/search'
import { columns } from './schemas/table'
import Edit from './edit.vue'
import { VTableColumnBtn, VTableColumnDialogBtn } from '@/components/VTable'
import { article } from '@/apis/article/article'
import { category } from '@/apis/article/category'

const message = useMessage()
const { hasPermission } = usePermission()
const { dicts } = useDict(async () => {
  return { category: await category.list({ status: 1 }) }
})

const tableRef = ref()
const editRef = ref()
const actionColumn = {
  width: 160,
  render(row: any) {
    return h(NSpace, { align: 'center', justify: 'center' }, () => [
      hasPermission(['article:article:update']) && h(VTableColumnBtn, { onClick: () => handleEdit(row.id) }, () => '编辑'),
      hasPermission(['article:article:delete']) && h(VTableColumnDialogBtn, { fn: () => handleDelete([row.id]) }),
    ])
  },
}
const searchGiProps = {
  span: 'xs:24 s:12 m:12 l:8',
  offset: 'xs:0 s:0 m:0 l:8',
}

const checkedRowKeys = computed(() => unref(tableRef)?.getCheckedRowKeys() || [])

async function load(params: any) {
  return article.page({ ...params })
}

function handleAdd() {
  unref(editRef).open()
}

function handleEdit(id: number | string) {
  unref(editRef).open({ edit: true, id })
}

async function handleDelete(ids: number[] | string[]) {
  try {
    await article.delete({ ids })
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
      :columns="columns({ dicts })"
      :action-column="actionColumn"
      :search-gi-props="searchGiProps"
      :search-schemas="searchSchemas"
      :load="load"
      :scroll-x="1000"
    >
      <template #action>
        <VTableBtn
          v-permission="['article:article:add']"
          @click="handleAdd"
        >
          新 建
        </VTableBtn>
        <VTableDialogBtn
          v-permission="['article:article:delete']"
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
