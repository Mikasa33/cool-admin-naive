import { category } from '@/apis/product/category'

export const schemas = [
  {
    field: 'id',
    show: false,
  },
  {
    field: 'imgs',
    label: '商品图片',
    component: 'VUpload',
    componentProps: {
      listType: 'image-card',
      max: 9,
      accept: 'image/*',
    },
    hook: {
      get: ({ model }: any) => {
        model.imgs = model.imgs?.toString()
      },
      set: ({ model }: any) => {
        model.imgs = model.imgs?.split(',')
      },
    },
    rules: { required: true, type: 'array', message: '请上传商品图片', trigger: ['blur', 'input'] },
    giProps: {
      span: 24,
    },
  },
  {
    field: 'title',
    label: '商品标题',
    component: 'NInput',
    rules: { required: true, message: '请输入商品标题', trigger: ['blur', 'input'] },
    giProps: {
      span: 24,
    },
  },
  {
    field: 'description',
    label: '商品描述',
    component: 'NInput',
    rules: { required: true, message: '请输入商品描述', trigger: ['blur', 'input'] },
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
    field: 'price',
    label: '价格',
    component: 'NInputNumber',
    componentProps: {
      precision: 2,
      min: 0,
      showButton: false,
      class: 'w-full',
    },
    componentSlots: {
      prefix: () => '¥',
    },
    rules: { required: true, type: 'number', message: '请输入价格', trigger: ['blur', 'input'] },
  },
  {
    field: 'stock',
    label: '库存',
    component: 'NInputNumber',
    componentProps: {
      min: 0,
      class: 'w-full',
    },
    rules: { required: true, type: 'number', message: '请输入库存', trigger: ['blur', 'input'] },
  },
  {
    field: 'content',
    label: '商品详情',
    component: 'VEditorWang',
    giProps: {
      span: 24,
    },
  },
  {
    field: 'afterSale',
    label: '售后说明',
    component: 'NInput',
    componentProps: {
      type: 'textarea',
    },
    giProps: {
      span: 24,
    },
  },
  {
    field: 'limit',
    label: '是否限购',
    component: 'NSwitch',
    componentProps: {
      uncheckedValue: 0,
      checkedValue: 1,
    },
    defaultValue: 0,
  },
  {
    field: 'limitNum',
    label: '每人限购数量',
    component: 'NInputNumber',
    componentProps: {
      min: 1,
      class: 'w-full',
    },
    defaultValue: 1,
    rules: { required: true, type: 'number', message: '请输入每人限购数量', trigger: ['blur', 'input'] },
    ifShow: ({ model }: any) => model.limit,
  },
]
