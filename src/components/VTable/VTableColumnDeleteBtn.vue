<script lang="ts" setup>
const props = defineProps<{
  delete?: Function
}>()

const emit = defineEmits(['confirm', 'cancel'])

const dialog = useDialog()

function handleClick() {
  const d = dialog.warning({
    autoFocus: false,
    title: '提示',
    content: '是否确认删除此数据？',
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
    size="small"
    type="error"
    tertiary
    v-bind="$attrs"
    @click="handleClick"
  >
    删除
  </NButton>
</template>
