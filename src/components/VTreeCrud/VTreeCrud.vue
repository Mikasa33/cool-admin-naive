<script lang="ts" setup>
import type { TreeDropInfo, TreeOption } from 'naive-ui'
import type { TreeCurdProps } from './types'
import { revDeepTree } from '@/utils'

const props = withDefaults(defineProps<TreeCurdProps>(), {
  selectedKeys: () => [],
  draggable: false,
  isAdd: false,
  isUpdate: true,
  isDelete: true,
})

const emit = defineEmits<{
  (evt: 'update:selected-keys', value: string[] | number[], option: Array<TreeOption | null>): void
  (evt: 'add', value?: any): void
  (evt: 'edit', value: any): void
  (evt: 'drop', value: any): void
}>()

const attrs = useAttrs()
const dialog = useDialog()
const { hasPermission } = usePermission()

const keyField = computed(() => attrs['key-field'] as string)
const pattern = ref('')
const data = ref<any[]>([])
const [init, toggleInit] = useToggle()
const [loading, toggleLoading] = useToggle()

async function load() {
  try {
    toggleLoading(true)

    if (props.permission && !hasPermission([`${props.permission}:list`]))
      return

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
  options: computed(() => {
    const options = []

    if (props.isAdd && props.permission && hasPermission([`${props.permission}:add`])) {
      options.push({
        key: 'add',
        label: '新建',
        icon: () => h('div', { class: 'i-icon-park-outline-plus' }),
      })
    }
    if (props.isUpdate && props.permission && hasPermission([`${props.permission}:update`])) {
      options.push({
        key: 'edit',
        label: '编辑',
        icon: () => h('div', { class: 'i-icon-park-outline-edit' }),
      })
    }
    if (props.isDelete && props.permission && hasPermission([`${props.permission}:delete`])) {
      options.push({
        key: 'delete',
        label: '删除',
        icon: () => h('div', { class: 'i-icon-park-outline-delete' }),
      })
    }

    return options
  }),
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
  else if (key === 'edit') {
    emit('edit', dropdown.data)
  }
  else {
    emit('add')
  }
}

function handleClickoutsideDropdown() {
  dropdown.show = false
}

function handleUpdateSelectedKeys(keys: string[] | number[], options: Array<TreeOption | null>) {
  if (keys.length)
    emit('update:selected-keys', keys, options)
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
  reload: load,
  getData: () => unref(data),
})
</script>

<template>
  <NCard
    :bordered="false"
    :segmented="{
      content: true,
      action: true,
    }"
    :header-style="{ padding: '0 24px' }"
    class="h-full"
  >
    <template #header>
      <NSpace
        align="center"
        justify="space-between"
        class="h-52px"
      >
        <div class="text-16px">
          {{ title }}
        </div>
        <div class="flex">
          <NTooltip trigger="hover">
            <template #trigger>
              <div
                class="h-24px w-24px flex-center cursor-pointer rounded-3px text-15px transition-base hover:bg-[rgba(0,0,0,0.09)]"
                @click="load"
              >
                <div class="i-icon-park-outline-refresh" />
              </div>
            </template>
            刷新
          </NTooltip>
          <NTooltip
            v-if="permission && hasPermission([`${permission}:add`])"
            trigger="hover"
          >
            <template #trigger>
              <div
                class="ml-8px h-24px w-24px flex-center cursor-pointer rounded-3px text-18px transition-base hover:bg-[rgba(0,0,0,0.09)]"
                @click="emit('add')"
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
        :draggable="draggable && (permission ? hasPermission([`${permission}:update`]) : false)"
        selectable
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
