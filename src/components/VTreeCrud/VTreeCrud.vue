<script lang="ts" setup>
import type { TreeDropInfo, TreeOption } from 'naive-ui'
import { revDeepTree } from '@/utils'

export interface Props {
  title?: string
  selectedKeys?: string[] | number[]
  load: Function
  delete: Function
}

const props = withDefaults(defineProps<Props>(), {
  selectedKeys: () => [],
})

const emit = defineEmits(['update:selected-keys', 'add', 'edit', 'drop'])

const attrs = useAttrs()
const dialog = useDialog()

const keyField = computed(() => attrs['key-field'] as string)
const pattern = ref('')
const data = ref<any[]>([])
const [init, toggleInit] = useToggle()
const [loading, toggleLoading] = useToggle()

async function load() {
  try {
    toggleLoading(true)
    data.value = await props.load()

    if (!props.selectedKeys.length && data.value.length) {
      const first = unref(data)?.[0]
      handleUpdateSelectedKeys([first?.[unref(keyField)]], [first])
    }
  }
  catch (err) {

  }
  finally {
    if (!unref(init))
      toggleInit(true)

    toggleLoading(false)
  }
}

const dropdown = reactive<any>({
  show: false,
  data: null,
  x: 0,
  y: 0,
  options: [
    {
      key: 'add',
      label: '新建',
      icon: () => h('div', { class: 'i-icon-park-outline-plus' }),
    },
    {
      key: 'edit',
      label: '编辑',
      icon: () => h('div', { class: 'i-icon-park-outline-edit' }),
    },
    {
      key: 'delete',
      label: '删除',
      icon: () => h('div', { class: 'i-icon-park-outline-delete' }),
    },
  ],
})

function nodeProps({ option }: any) {
  return {
    async onContextmenu(e: MouseEvent) {
      e.preventDefault()
      dropdown.show = false
      dropdown.data = option
      await nextTick()
      setTimeout(() => {
        dropdown.show = true
        dropdown.x = e.clientX
        dropdown.y = e.clientY
      }, 100)
    },
  }
}

function handleSelectDropdown(key: 'add' | 'edit' | 'delete') {
  dropdown.show = false

  if (key === 'delete') {
    const d = dialog.warning({
      autoFocus: false,
      title: '提示',
      content: '是否确认删除此数据？',
      positiveText: '确 认',
      negativeText: '取 消',
      onPositiveClick: async () => {
        d.loading = true
        await props.delete?.(dropdown.data.id)
      },
    })
  }
  else {
    emit(key, dropdown.data)
  }
}

function handleClickoutsideDropdown() {
  dropdown.show = false
}

function handleUpdateSelectedKeys(keys: string[] | number[], option: Array<TreeOption | null>) {
  if (keys.length)
    emit('update:selected-keys', keys, option)
}

function handleAdd() {
  emit('add')
}

function findSiblingsAndIndex(node: TreeOption, nodes?: TreeOption[]): [TreeOption[], number] | [null, null] {
  if (!nodes)
    return [null, null]

  for (let i = 0; i < nodes.length; ++i) {
    const siblingNode = nodes[i]

    if (siblingNode[unref(keyField)] === node[unref(keyField)])
      return [nodes, i]

    const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children)

    if (siblings && index !== null)
      return [siblings, index]
  }

  return [null, null]
}

function handleDrop({ node, dragNode, dropPosition }: TreeDropInfo) {
  const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(dragNode, unref(data))

  if (dragNodeSiblings === null || dragNodeIndex === null)
    return

  dragNodeSiblings.splice(dragNodeIndex, 1)

  if (dropPosition === 'inside') {
    dragNode.parentId = node[unref(keyField)]

    if (node.children)
      node.children.unshift(dragNode)
    else
      node.children = [dragNode]
  }
  else if (dropPosition === 'before') {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, unref(data))

    if (nodeSiblings === null || nodeIndex === null)
      return

    dragNode.parentId = node.parentId
    nodeSiblings.splice(nodeIndex, 0, dragNode)
  }
  else if (dropPosition === 'after') {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, unref(data))

    if (nodeSiblings === null || nodeIndex === null)
      return

    dragNode.parentId = node.parentId
    nodeSiblings.splice(nodeIndex + 1, 0, dragNode)
  }

  emit('drop', revDeepTree(unref(data)))
}

onMounted(() => {
  load()
})

defineExpose({
  refresh: load,
})
</script>

<template>
  <NCard
    size="small"
    :bordered="false"
    :segmented="{
      content: true,
      action: true,
    }"
    class="h-full"
  >
    <template #header>
      <NSpace
        align="center"
        justify="space-between"
      >
        <div>{{ title }}</div>
        <div class="flex">
          <NTooltip trigger="hover">
            <template #trigger>
              <div
                class="mr-8px h-24px w-24px flex-center cursor-pointer rounded-3px text-15px transition-base hover:bg-[rgba(0,0,0,0.09)]"
                @click="load"
              >
                <div class="i-icon-park-outline-refresh" />
              </div>
            </template>
            刷新
          </NTooltip>
          <NTooltip trigger="hover">
            <template #trigger>
              <div
                class="h-24px w-24px flex-center cursor-pointer rounded-3px text-18px transition-base hover:bg-[rgba(0,0,0,0.09)]"
                @click="handleAdd"
              >
                <div class="i-icon-park-outline-plus" />
              </div>
            </template>
            新建
          </NTooltip>
        </div>
      </NSpace>
    </template>
    <NSpin
      :show="loading"
      size="small"
      class="h-full"
    >
      <NInput
        v-model:value="pattern"
        clearable
        placeholder="请输入搜索关键词"
        class="mb-8px"
      />
      <NTree
        v-show="init"
        v-bind="$attrs"
        :selected-keys="selectedKeys"
        :pattern="pattern"
        :data="data"
        :node-props="nodeProps"
        :show-irrelevant-nodes="false"
        selectable
        draggable
        block-line
        class="tree"
        @drop="handleDrop"
        @update:selected-keys="handleUpdateSelectedKeys"
      />
    </NSpin>
    <NDropdown
      v-bind="dropdown"
      trigger="manual"
      placement="bottom-start"
      class="min-w-150px"
      @select="handleSelectDropdown"
      @clickoutside="handleClickoutsideDropdown"
    />
  </NCard>
</template>

<style lang="less" scoped>
.tree {
  :deep(.n-tree-node) {
    align-items: center;
    height: 32px;
  }
}
</style>
