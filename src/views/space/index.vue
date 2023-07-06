<script setup lang="ts">
import { NSpace, useMessage } from 'naive-ui'
import { columns } from './schemas/table'
import FileType from './components/FileType.vue'
import { VTableColumnDialogBtn } from '@/components/VTable'
import { spaceInfo } from '@/apis/space/space'

const message = useMessage()

const fileTypeRef = ref()
const tableRef = ref()
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
  return await spaceInfo.page({ ...params, classifyId: getClassifyId() })
}

function getClassifyId() {
  return Number(unref(fileTypeRef).getIds()?.toString())
}

async function handleDelete(ids: number[] | string[]) {
  try {
    await spaceInfo.delete({ ids })
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

async function handleUploadFinish(file: any) {
  try {
    await spaceInfo.add({
      classifyId: getClassifyId(),
      ...file,
    })
    handleRefresh()
  }
  catch (err) {

  }
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
            <VUpload
              @finish="handleUploadFinish"
            />
            <VTableDialogBtn :fn="handleBatchDelete" />
          </template>
        </VTable>
      </NGi>
    </NGrid>
  </div>
</template>
