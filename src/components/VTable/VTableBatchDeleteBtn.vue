<script lang="ts" setup>
const props = defineProps<{
  delete?: Function
}>()

const emit = defineEmits(['confirm', 'cancel'])

const dialog = useDialog()

const checkedRowKeys = inject<any[]>('v-table-checkedRowKeys')

function handleClick() {
  const d = dialog.warning({
    autoFocus: false,
    title: '提示',
    content: '是否确认批量删除已选数据？',
    positiveText: '确 认',
    negativeText: '取 消',
    onPositiveClick: async () => {
      d.loading = true
      await props.delete?.()
    },
    onNegativeClick: () => {
      emit('cancel')
    },
  })
}
</script>

<template>
  <NButton
    type="error"
    :disabled="!checkedRowKeys?.length"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot v-if="$slots.default" />
    <span v-else>批量删除</span>
  </NButton>
</template>
