import dayjs from 'dayjs'

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
    key: 'label',
    title: '标识',
    align: 'center',
  },
  {
    key: 'remark',
    title: '备注',
    align: 'center',
  },
  {
    key: 'createTime',
    title: '创建时间',
    align: 'center',
    width: 180,
    render(row: any) {
      return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    key: 'updateTime',
    title: '更新时间',
    align: 'center',
    width: 180,
    render(row: any) {
      return dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
]
