import dayjs from 'dayjs'
import { NImage } from 'naive-ui'

export const columns = [
  {
    type: 'selection',
    fixed: 'left',
    align: 'center',
    width: 50,
  },
  {
    key: 'nickName',
    title: '昵称',
    align: 'center',
    width: 160,
  },
  {
    key: 'headImg',
    title: '头像',
    align: 'center',
    width: 80,
    render(row: any) {
      return h('div', { class: 'text-0px flex-center ' }, h(NImage, { src: row.headImg, objectFit: 'cover', width: 40, height: 40, style: { width: '40px', height: '40px', borderRadius: '3px' } }))
    },
  },
  {
    key: 'phone',
    title: '手机号',
    align: 'center',
    width: 160,
  },
  {
    key: 'sex',
    title: '性别',
    align: 'center',
    width: 80,
  },
  {
    key: 'type',
    title: '登录方式',
    align: 'center',
    width: 80,
  },
  {
    key: 'status',
    title: '状态',
    align: 'center',
    width: 80,
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
]
