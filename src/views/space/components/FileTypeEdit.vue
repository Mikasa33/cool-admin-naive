<script setup lang="ts">
import { spaceType } from '@/apis/space/space'

const emit = defineEmits(['refresh'])

const message = useMessage()
const modalRef = ref()
const formRef = ref()
const { open, close } = useModal(modalRef)
const isEdit = ref(false)
const title = computed(() => `${unref(isEdit) ? '编辑' : '新建'}文件分类`)
const [init, toggleInit] = useToggle()
const [loading, toggleLoading] = useToggle()
const schemas = [
  {
    field: 'id',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    component: 'NInput',
    rules: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
  },
]

async function handleOpen(params: { edit?: boolean; record?: any }) {
  await open()
  toggleInit(true)
  isEdit.value = params?.edit || false
  unref(formRef).init(schemas)
  if (params?.edit) {
    try {
      unref(formRef).setFieldsValue(params.record)
    }
    catch (err) {

    }
  }
  else if (params.record) {
    unref(formRef).setFieldsValue({ parentId: params.record.id })
  }
  toggleInit(false)
}

async function handleConfirm() {
  try {
    await unref(formRef).validate()
    toggleInit(true)
    toggleLoading(true)
    await spaceType[unref(isEdit) ? 'update' : 'add'](unref(formRef).getFieldsValue())
    message.success('保存成功')
    close()
    emit('refresh')
  }
  catch (err) {

  }
  finally {
    toggleInit(false)
    toggleLoading(false)
  }
}

defineExpose({
  open: handleOpen,
  close,
})
</script>

<template>
  <VModal
    ref="modalRef"
    :title="title"
    :confirm-loading="loading"
    is-crud
    @confirm="handleConfirm"
  >
    <VForm
      ref="formRef"
      :loading="init"
      :gi-span="24"
    />
  </VModal>
</template>
