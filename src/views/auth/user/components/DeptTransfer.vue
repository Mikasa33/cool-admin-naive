<script setup lang="ts">
import { user } from '@/apis/auth/user'
import { department } from '@/apis/auth/department'
import { deepTree } from '@/utils'

const emit = defineEmits(['refresh'])

const message = useMessage()
const modalRef = ref()
const formRef = ref()
const { open, close } = useModal(modalRef)
const [loading, toggleLoading] = useToggle()
const schemas = [
  {
    field: 'userIds',
    label: '用户 IDs',
    show: false,
  },
  {
    field: 'departmentId',
    label: '选择部门',
    component: 'VTreeSelect',
    componentProps: {
      placeholder: '请选择部门',
      defaultExpandAll: true,
      keyField: 'id',
      labelField: 'name',
      load: async () => {
        const list = await department.list()
        return deepTree(list)
      },
    },
    rules: { required: true, type: 'number', message: '请选择部门', trigger: ['blur', 'input'] },
  },
]

async function handleOpen(params: { ids?: number[] | string[] }) {
  await open()
  unref(formRef).init(schemas)
  unref(formRef).setFieldsValue({ userIds: params.ids })
}

async function handleConfirm() {
  try {
    await unref(formRef).validate()
    toggleLoading(true)
    await user.move(unref(formRef).getFieldsValue())
    message.success('转移成功')
    close()
    emit('refresh')
  }
  catch (err) {

  }
  finally {
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
    title="转移部门"
    :confirm-loading="loading"
    is-crud
    @confirm="handleConfirm"
  >
    <VForm
      ref="formRef"
      :gi-span="24"
    />
  </VModal>
</template>
