<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { columns } from './schemas/table'
import Edit from './edit.vue'
import FileType from './components/FileType.vue'
import { VTableColumnDialogBtn } from '@/components/VTable'
import { fileInfo } from '@/apis/system/file'

const message = useMessage()

const fileTypeRef = ref()
const tableRef = ref()
const editRef = ref()
const actionColumn = {
  width: 100,
  render(row: any) {
    return h(NSpace, { align: 'center', justify: 'center' }, () => [
      h(VTableColumnDialogBtn, { fn: () => handleDelete([row.id]) }),
    ])
  },
}

const checkedRowKeys = computed(() => unref(tableRef)?.getCheckedRowKeys() || [])

async function load(params: any) {
  return await fileInfo.page({ ...params, classifyId: getClassifyId() })
}

function getClassifyId() {
  return Number(unref(fileTypeRef).getIds()?.toString())
}

function handleAdd() {
  unref(editRef).open({ classifyId: getClassifyId() })
}

async function handleDelete(ids: number[] | string[]) {
  try {
    await fileInfo.delete({ ids })
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
        <FileType
          ref="fileTypeRef"
          @refresh="handleRefresh"
        />
      </NGi>
      <NGi span="xs:24 m:16 l:18 xl:20">
        <VTable
          ref="tableRef"
          :columns="columns"
          :action-column="actionColumn"
          :load="load"
          :scroll-x="930"
          :init="false"
        >
          <template #action>
            <VTableBtn @click="handleAdd">
              上 传
            </VTableBtn>
            <VTableDialogBtn :fn="handleBatchDelete" />
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
