import dayjs from 'dayjs'

export const columns = [
  {
    type: 'selection',
    fixed: 'left',
    align: 'center',
    width: 50,
  },
  {
    key: '#',
    title: '#',
    align: 'center',
    width: 50,
    render(_: any, index: number) {
      return index + 1
    },
  },
  {
    key: 'userName',
    title: '操作人',
    align: 'center',
  },
  {
    key: 'data',
    title: '数据',
    align: 'center',
    width: 200,
    ellipsis: {
      tooltip: {
        style: { maxWidth: '800px' },
      },
    },
    render(row: any) {
      return JSON.stringify(row.data, null, 4)
    },
  },
  {
    key: 'url',
    title: '请求地址',
    align: 'center',
    width: 250,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'params',
    title: '参数',
    align: 'center',
    width: 200,
    ellipsis: {
      tooltip: {
        style: { maxWidth: '800px' },
      },
    },
    render(row: any) {
      return JSON.stringify(row.params, null, 4)
    },
  },
  {
    key: 'count',
    title: '删除条数',
    align: 'center',
    width: 100,
  },
  {
    key: 'createTime',
    title: '创建时间',
    sorter: true,
    sortOrder: 'descend',
    align: 'center',
    width: 180,
    render(row: any) {
      return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
]
