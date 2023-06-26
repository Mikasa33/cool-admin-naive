<script setup lang="ts">
import DeptEdit from './DeptEdit.vue'
import { department } from '@/apis/system/department'
import { deepTree, revDeepTree } from '@/utils'

const emit = defineEmits(['refresh'])

const message = useMessage()

const treeRef = ref()
const editRef = ref()

const selectedKeys = ref<string[] | number[]>([])

const selectedAndChildrenKeys = ref<string[] | number[]>([])

async function load(params: any) {
  const list = await department.list(params)
  return deepTree(list.map((item: any) => {
    item.children = []
    return item
  }))
}

function handleRefresh() {
  unref(treeRef).refresh()
}

function handleAdd(record: any) {
  unref(editRef).open({ record })
}

function handleEdit(record: any) {
  unref(editRef).open({ edit: true, record })
}

async function handleDelete(id: number | string) {
  try {
    await department.delete({ ids: [id] })
    message.success('删除成功')
    handleRefresh()
  }
  catch (err) {

  }
}

async function handleDrop(nodes: any[]) {
  try {
    await department.order(nodes.map((item: any, index: number) => {
      const { id, parentId } = item
      return { id, parentId, orderNum: index }
    }))
    message.success('修改成功')
  }
  catch (err) {

  }
}

function handleUpdateSelectedKeys(_: any, options: any[]) {
  const ids = options?.[0]?.children ? revDeepTree(options?.[0]?.children).map(e => e.id) : []
  ids.unshift(options?.[0]?.id)
  selectedAndChildrenKeys.value = ids
  emit('refresh')
}

function getId() {
  return unref(selectedKeys)?.[0]
}

function getIds() {
  return unref(selectedAndChildrenKeys)
}

defineExpose({
  getId,
  getIds,
})
</script>

<template>
  <div class="h-full">
    <VTreeCrud
      ref="treeRef"
      v-model:selected-keys="selectedKeys"
      title="组织架构"
      key-field="id"
      label-field="name"
      default-expand-all
      :load="load"
      :delete="handleDelete"
      @add="handleAdd"
      @edit="handleEdit"
      @drop="handleDrop"
      @update:selected-keys="handleUpdateSelectedKeys"
    />
    <DeptEdit
      ref="editRef"
      @refresh="handleRefresh"
    />
  </div>
</template>
