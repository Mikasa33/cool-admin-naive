import dayjs from 'dayjs'
import { NImage, NTag } from 'naive-ui'
import { fileRule, fileSize } from '@/utils/file'

export const columns = [
  {
    type: 'selection',
    fixed: 'left',
    align: 'center',
    width: 50,
  },
  {
    key: 'url',
    title: '缩略图',
    align: 'center',
    width: 150,
    render(row: any) {
      return h('div', { class: 'text-0px flex-center ' }, h(NImage, { src: row.url, objectFit: 'cover', style: { height: '40px', borderRadius: '3px' } }))
    },
  },
  {
    key: 'name',
    title: '名称',
    align: 'center',
    width: 200,
    ellipsis: {
      tooltip: {
        style: { maxWidth: '800px' },
      },
    },
  },
  {
    key: 'type',
    title: '类型',
    align: 'center',
    width: 100,
    render(row: any) {
      const type: any = fileRule(row.type)
      return h(NTag, { color: { color: type.color, borderColor: 'transparent', textColor: '#fff' } }, () => type.label)
    },
  },
  {
    key: 'size',
    title: '大小',
    align: 'center',
    width: 150,
    render(row: any) {
      return fileSize(row.size)
    },
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
