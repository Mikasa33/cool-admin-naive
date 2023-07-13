<script setup lang="ts">
import { department } from '@/apis/auth/department'
import { deepTree } from '@/utils'

const emit = defineEmits(['refresh'])

const message = useMessage()
const modalRef = ref()
const formRef = ref()
const { open, close } = useModal(modalRef)
const isEdit = ref(false)
const title = computed(() => `${unref(isEdit) ? '编辑' : '新建'}部门`)
const [init, toggleInit] = useToggle()
const [loading, toggleLoading] = useToggle()
const schemas = [
  {
    field: 'id',
    show: false,
  },
  {
    field: 'name',
    label: '部门名称',
    component: 'NInput',
    rules: { required: true, message: '请输入部门名称', trigger: ['blur', 'input'] },
  },
  {
    field: 'parentId',
    labelField: 'parentName',
    label: '上级部门',
    component: 'VTreeSelect',
    componentProps: ({ model }: any) => ({
      disabled: !!model.id,
      defaultExpandAll: true,
      keyField: 'id',
      labelField: 'name',
      load: async () => {
        const list = await department.list()
        return deepTree(list)
      },
    }),
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'NInputNumber',
    componentProps: {
      min: 0,
      class: 'w-full',
    },
    defaultValue: 0,
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
    await department[unref(isEdit) ? 'update' : 'add'](unref(formRef).getFieldsValue())
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
