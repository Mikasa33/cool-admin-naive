<script setup lang="ts">
import FileTypeEdit from './FileTypeEdit.vue'
import { spaceType } from '@/apis/space/space'
import { deepTree, revDeepTree } from '@/utils'

const emit = defineEmits(['refresh'])

const message = useMessage()

const treeRef = ref()
const editRef = ref()

const selectedKeys = ref<string[] | number[]>([])

const selectedAndChildrenKeys = ref<string[] | number[]>([])

async function load(params: any) {
  const list = await spaceType.list({ order: 'createTime', sort: 'asc', ...params })
  return deepTree(list)
}

async function handleRefresh() {
  await unref(treeRef).refresh()
}

function handleAdd(record: any) {
  unref(editRef).open({ record })
}

function handleEdit(record: any) {
  unref(editRef).open({ edit: true, record })
}

async function handleDelete(id: number | string) {
  try {
    await spaceType.delete({ ids: [id] })
    message.success('删除成功')

    await handleRefresh()

    if (unref(selectedKeys)?.[0] === id) {
      const ids = unref(treeRef).getData()?.[0]?.children ? revDeepTree(unref(treeRef).getData()?.[0]?.children).map(e => e.id) : []
      ids.unshift(unref(treeRef).getData()?.[0]?.id)
      selectedKeys.value = [unref(treeRef).getData()?.[0]?.id]
      selectedAndChildrenKeys.value = ids
      emit('refresh')
    }
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
      title="文件分类"
      key-field="id"
      label-field="name"
      default-expand-all
      :load="load"
      :delete="handleDelete"
      @add="handleAdd"
      @edit="handleEdit"
      @update:selected-keys="handleUpdateSelectedKeys"
    />
    <FileTypeEdit
      ref="editRef"
      @refresh="handleRefresh"
    />
  </div>
</template>
