export const searchSchemas = [
  {
    field: 'keyWord',
    label: '昵称、手机号',
    component: 'NInput',
  },
  {
    field: 'loginType',
    label: '登录方式',
    component: 'VSelect',
    componentProps: {
      options: [
        { value: 0, label: '小程序' },
        { value: 1, label: '公众号' },
        { value: 2, label: 'H5' },
      ],
    },
  },
  {
    field: 'gender',
    label: '性别',
    component: 'VSelect',
    componentProps: {
      options: [
        { value: 0, label: '未知' },
        { value: 1, label: '男' },
        { value: 2, label: '女' },
      ],
    },
  },
]
