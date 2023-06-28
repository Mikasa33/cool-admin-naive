<script setup lang="ts">
import { schemas } from './schemas/form'
import { dictInfo } from '@/apis/system/dict'

const emit = defineEmits(['refresh'])

const message = useMessage()
const modalRef = ref()
const formRef = ref()
const { open, close } = useModal(modalRef)
const isEdit = ref(false)
const [init, toggleInit] = useToggle()
const [loading, toggleLoading] = useToggle()

async function handleOpen(params: { edit?: boolean; id?: number | string; classifyId: number }) {
  await open()
  toggleInit(true)
  isEdit.value = params?.edit || false
  unref(formRef).init(schemas({ classifyId: params.classifyId }))
  if (params?.edit) {
    try {
      const data = await dictInfo.info({ id: params.id })
      unref(formRef).setFieldsValue(data)
    }
    catch (err) {

    }
  }
  toggleInit(false)
}

async function handleConfirm() {
  try {
    await unref(formRef).validate()
    toggleInit(true)
    toggleLoading(true)
    await dictInfo[unref(isEdit) ? 'update' : 'add'](unref(formRef).getFieldsValue())
    message.success('上传成功')
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
    title="上传文件"
    confirm-label="上 传"
    :confirm-loading="loading"
    @confirm="handleConfirm"
  >
    <VForm
      ref="formRef"
      :loading="init"
      :gi-span="24"
    />
  </VModal>
</template>
