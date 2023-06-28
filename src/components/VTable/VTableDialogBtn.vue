<script lang="ts" setup>
const props = withDefaults(defineProps<{
  text?: string
  fn?: Function
}>(), {
  text: '删除',
})

const emit = defineEmits(['confirm', 'cancel'])

const dialog = useDialog()

const checkedRowKeys = inject<any[]>('v-table-checkedRowKeys')

function handleClick() {
  const d = dialog.warning({
    autoFocus: false,
    title: '提示',
    content: `是否确认批量${props.text}已选数据？`,
    positiveText: '确 认',
    negativeText: '取 消',
    onPositiveClick: async () => {
      d.loading = true
      await props.fn?.()
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
    <span v-else>批量{{ text }}</span>
  </NButton>
</template>
