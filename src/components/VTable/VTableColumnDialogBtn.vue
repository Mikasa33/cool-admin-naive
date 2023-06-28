<script lang="ts" setup>
const props = withDefaults(defineProps<{
  text?: string
  fn?: Function
}>(), {
  text: '删除',
})

const emit = defineEmits(['confirm', 'cancel'])

const dialog = useDialog()

function handleClick() {
  const d = dialog.warning({
    autoFocus: false,
    title: '提示',
    content: `是否确认${props.text}此数据？`,
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
    size="small"
    type="error"
    tertiary
    v-bind="$attrs"
    @click="handleClick"
  >
    {{ text }}
  </NButton>
</template>
