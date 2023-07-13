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
  {
    field: 'status',
    label: '状态',
    component: 'VRadio',
    componentProps: {
      options: [
        { value: 1, label: '开启' },
        { value: 0, label: '关闭' },
      ],
    },
    defaultValue: 1,
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
