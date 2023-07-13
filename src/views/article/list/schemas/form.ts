import { category } from '@/apis/article/category'

export const schemas = [
  {
    field: 'id',
    show: false,
  },
  {
    field: 'title',
    label: '标题',
    component: 'NInput',
    rules: { required: true, message: '请输入标题', trigger: ['blur', 'input'] },
    giProps: {
      span: 24,
    },
  },
  {
    field: 'author',
    label: '作者',
    component: 'NInput',
    rules: { required: true, message: '请输入作者', trigger: ['blur', 'input'] },
  },
  {
    field: 'categoryId',
    label: '分类',
    component: 'VSelect',
    componentProps: {
      valueField: 'id',
      labelField: 'name',
      load: async () => {
        return category.list()
      },
    },
    rules: { required: true, type: 'number', message: '请选择类型', trigger: ['blur', 'input'] },
  },
  {
    field: 'content',
    label: '内容',
    component: 'VEditorWang',
    giProps: {
      span: 24,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: {
      type: 'textarea',
    },
    giProps: {
      span: 24,
    },
  },
]
