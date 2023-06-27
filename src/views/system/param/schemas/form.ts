import { dataType } from './table'

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
    field: 'keyName',
    label: '标识',
    component: 'NInput',
    rules: { required: true, message: '请输入标识', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'dataType',
    label: '类型',
    component: 'VRadio',
    componentProps: {
      options: dataType,
    },
    defaultValue: 0,
  },
  {
    field: 'data',
    hook: {
      get: ({ model }: any) => {
        model.data = model[`data${model.dataType}`]
      },
    },
    show: false,
  },
  {
    field: 'data0',
    label: '数据',
    component: 'NInput',
    componentProps: {
      type: 'textarea',
    },
    rules: { required: true, message: '请输入数据', trigger: ['blur', 'input'] },
    hook: {
      get: ({ model }: any) => {
        delete model.data0
      },
    },
    ifShow: ({ model }: any) => model.dataType === 0,
  },
  {
    field: 'data1',
    label: '数据',
    component: 'VEditorWang',
    rules: { required: true, message: '请输入数据', trigger: ['blur', 'input'] },
    hook: {
      get: ({ model }: any) => {
        delete model.data1
      },
    },
    ifShow: ({ model }: any) => model.dataType === 1,
  },
  {
    field: 'data2',
    label: '数据',
    component: 'NInput',
    rules: { required: true, message: '请输入数据', trigger: ['blur', 'input'] },
    hook: {
      get: ({ model }: any) => {
        delete model.data2
      },
    },
    ifShow: ({ model }: any) => model.dataType === 2,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: {
      type: 'textarea',
    },
  },
]
