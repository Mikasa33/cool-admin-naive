import dayjs from 'dayjs'

export const columns = [
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
    key: 'userId',
    title: '用户 ID',
    align: 'center',
    width: 100,
  },
  {
    key: 'name',
    title: '昵称',
    align: 'center',
  },
  {
    key: 'action',
    title: '请求地址',
    align: 'center',
    width: 200,
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
      return JSON.stringify(row.params)
    },
  },
  {
    key: 'ip',
    title: 'IP',
    align: 'center',
  },
  {
    key: 'ipAddr',
    title: 'IP 地址',
    align: 'center',
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
