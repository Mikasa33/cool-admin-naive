import { role } from '@/apis/system/role'

export const schemas = [
  {
    field: 'id',
    show: false,
  },
  {
    field: 'departmentId',
    show: false,
  },
  {
    field: 'name',
    label: '姓名',
    component: 'NInput',
    rules: { required: true, message: '请输入姓名', trigger: ['blur', 'input'] },
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'NInput',
    rules: { required: true, message: '请输入昵称', trigger: ['blur', 'input'] },
  },
  {
    field: 'username',
    label: '用户名',
    component: 'NInput',
    rules: { required: true, message: '请输入用户名', trigger: ['blur', 'input'] },
  },
  {
    field: 'password',
    label: '密码',
    component: 'NInput',
    componentProps: {
      type: 'password',
    },
    rules: ({ model }: any) => !model.id && { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
  },
  {
    field: 'roleIdList',
    label: '角色',
    component: 'VSelect',
    componentProps: {
      valueField: 'id',
      labelField: 'name',
      multiple: true,
      load: async () => {
        return role.list()
      },
    },
    rules: { required: true, type: 'array', message: '请选择角色', trigger: ['blur', 'input'] },
    giProps: {
      span: 24,
    },
  },
  {
    field: 'phone',
    label: '手机号码',
    component: 'NInput',
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'NInput',
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
]
