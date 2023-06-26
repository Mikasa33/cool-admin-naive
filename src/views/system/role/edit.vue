<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import { schemas } from './schemas/form'
import { role } from '@/apis/system/role'

const emit = defineEmits(['refresh'])

const message = useMessage()
const modalRef = ref()
const formRef = ref()
const { open, close } = useModal(modalRef)
const isEdit = ref(false)
const title = computed(() => `${unref(isEdit) ? '编辑' : '新建'}角色`)
const [init, toggleInit] = useToggle()
const [loading, toggleLoading] = useToggle()

async function handleOpen(params: { edit?: boolean; id?: number | string }) {
  await open()
  toggleInit(true)
  isEdit.value = params?.edit || false
  unref(formRef).init(schemas)
  if (params?.edit) {
    try {
      const data = await role.info({ id: params.id })
      console.log(data)
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
    await role[unref(isEdit) ? 'update' : 'add'](unref(formRef).getFieldsValue())
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
    >
      <template #customRelevance="{ model, field }">
        <NSwitch
          v-model:value="model[field]"
          :checked-value="1"
          :unchecked-value="0"
        />
        <span class="ml-8px">是否关联上下级</span>
      </template>
    </VForm>
  </VModal>
</template>
