<script setup lang="ts">
import { schemas } from './schemas/form'
import { menu } from '@/apis/auth/menu'

const emit = defineEmits(['refresh'])

const message = useMessage()
const modalRef = ref()
const formRef = ref()
const { open, close } = useModal(modalRef)
const isEdit = ref(false)
const title = computed(() => `${unref(isEdit) ? '编辑' : '新建'}菜单`)
const [init, toggleInit] = useToggle()
const [loading, toggleLoading] = useToggle()

async function handleOpen(params: { edit?: boolean; id?: number | string; parentId?: number | string }) {
  await open()
  toggleInit(true)
  isEdit.value = params?.edit || false
  unref(formRef).init(schemas)

  if (params?.edit) {
    try {
      const data = await menu.info({ id: params.id })
      unref(formRef).setFieldsValue(data)
    }
    catch (err) {

    }
  }
  else if (params?.parentId) {
    unref(formRef).setFieldsValue({ parentId: params.parentId })
  }
  toggleInit(false)
}

async function handleConfirm() {
  try {
    await unref(formRef).validate()
    toggleInit(true)
    toggleLoading(true)
    await menu[unref(isEdit) ? 'update' : 'add'](unref(formRef).getFieldsValue())
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
