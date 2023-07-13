import { NImage, NTag } from 'naive-ui'
import dayjs from 'dayjs'
import currency from 'currency.js'

export function columns({ dicts }: any) {
  return [
    {
      type: 'selection',
      fixed: 'left',
      align: 'center',
      width: 50,
    },
    {
      key: 'imgs',
      title: '商品图',
      align: 'center',
      width: 100,
      render(row: any) {
        return h('div', { class: 'text-0px flex-center ' }, h(NImage, { src: row.imgs?.split(',')?.[0], objectFit: 'cover', style: { height: '50px', borderRadius: '3px' } }))
      },
    },
    {
      key: 'title',
      title: '商品标题',
      width: 300,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      key: 'price',
      title: '价格',
      align: 'center',
      render(row: any) {
        return `${currency(row.price, { symbol: '¥' })}`
      },
    },
    {
      key: 'stock',
      title: '库存',
      align: 'center',
    },
    {
      key: 'categoryId',
      title: '分类',
      align: 'center',
      render(row: any) {
        const find = dicts.category?.find((item: any) => item.id === row.categoryId)
        return find?.name
      },
    },
    {
      key: 'sale',
      title: '状态',
      align: 'center',
      render(row: any) {
        return h(NTag, { type: row.sale ? 'success' : 'error' }, () => row.sale ? '上架' : '下架')
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
}
