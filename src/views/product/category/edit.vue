<script setup lang="ts">
import { schemas } from './schemas/form'
import { category } from '@/apis/product/category'

const emit = defineEmits(['refresh'])

const message = useMessage()
const modalRef = ref()
const formRef = ref()
const { open, close } = useModal(modalRef)
const isEdit = ref(false)
const title = computed(() => `${unref(isEdit) ? '编辑' : '新建'}分类`)
const [init, toggleInit] = useToggle()
const [loading, toggleLoading] = useToggle()

async function handleOpen(params: { edit?: boolean; id?: number | string }) {
  await open()
  toggleInit(true)
  isEdit.value = params?.edit || false
  unref(formRef).init(schemas)
  if (params?.edit) {
    try {
      const data = await category.info({ id: params.id })
      unref(formRef).setFieldsValue({
        ...data,
        [`data${data.dataType}`]: data.data,
      })
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
    await category[unref(isEdit) ? 'update' : 'add'](unref(formRef).getFieldsValue())
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
    width="940px"
    @confirm="handleConfirm"
  >
    <VForm
      ref="formRef"
      :loading="init"
      :gi-span="24"
    />
  </VModal>
</template>
