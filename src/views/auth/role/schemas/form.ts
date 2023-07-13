// @unocss-include

import { menu } from '@/apis/auth/menu'
import { department } from '@/apis/auth/department'

export const schemas = [
  {
    field: 'id',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    component: 'NInput',
    rules: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'label',
    label: '标识',
    component: 'NInput',
    rules: { required: true, message: '请输入标识', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: {
      type: 'textarea',
    },
  },
  {
    field: 'menuIdList',
    label: '功能权限',
    component: 'VTree',
    componentProps: {
      load: menu.list,
      keyField: 'id',
      labelField: 'name',
    },
  },
  {
    field: 'relevance',
    label: '数据权限',
    slot: 'customRelevance',
    defaultValue: 0,
    itemProps: {
      showFeedback: false,
      class: 'mb-4px',
    },
  },
  {
    field: 'departmentIdList',
    label: '',
    component: 'VTree',
    componentProps: ({ model }: any) => ({
      load: department.list,
      keyField: 'id',
      labelField: 'name',
      cascade: !!model.relevance,
      checkStrategy: 'parent',
    }),
  },
]
