import { taskType } from './table'

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
    field: 'taskType',
    label: '类型',
    component: 'VRadio',
    componentProps: {
      options: taskType,
    },
    defaultValue: 0,
  },
  {
    field: 'cron',
    label: 'cron',
    component: 'NInput',
    componentProps: {
      placeholder: '* * * * * *',
    },
    rules: { required: true, message: '请输入 cron', trigger: ['blur', 'input'] },
    ifShow: ({ model }: any) => model.taskType === 0,
  },
  {
    field: 'every',
    label: '间隔(秒)',
    component: 'NInputNumber',
    componentProps: {
      class: 'w-full',
    },
    hook: {
      get: ({ model }: any) => {
        model.every = model.every * 1000
      },
      set: ({ model }: any) => {
        model.every = model.every / 1000
      },
    },
    rules: { required: true, type: 'number', message: '请输入间隔(秒)', trigger: ['blur', 'input'] },
    ifShow: ({ model }: any) => model.taskType === 1,
  },
  {
    field: 'service',
    label: 'service',
    component: 'NInput',
    componentProps: {
      placeholder: 'taskDemoService.test([1, 2])',
    },
  },
  {
    field: 'startDate',
    label: '开始时间',
    component: 'NDatePicker',
    componentProps: {
      type: 'datetime',
      class: 'w-full',
    },
    ifShow: ({ model }: any) => model.taskType === 0,
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
