import { NTag } from 'naive-ui'

export const taskType = [
  { value: 0, label: 'cron', type: 'info' },
  { value: 1, label: '时间间隔', type: 'warning' },
]

export const columns = [
  {
    type: 'selection',
    fixed: 'left',
    align: 'center',
    width: 50,
  },
  {
    key: 'name',
    title: '名称',
    align: 'center',
  },
  {
    key: 'taskType',
    title: '类型',
    align: 'center',
    render(row: any) {
      const find: any = taskType.find((item: any) => item.value === row.taskType)
      return h(NTag, { type: find.type }, () => find.label)
    },
  },
  {
    key: 'service',
    title: '执行服务',
    align: 'center',
  },
  {
    key: '',
    title: '定时规则',
    align: 'center',
    render(row: any) {
      return row.taskType ? `间隔 ${Number.parseInt(String(row.every / 1000))} 秒执行` : row.cron
    },
  },
  {
    key: 'status',
    title: '状态',
    align: 'center',
    render(row: any) {
      return h(NTag, { type: row.status ? 'success' : 'error' }, () => row.status ? '进行中' : '已停止')
    },
  },
]
