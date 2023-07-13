import dayjs from 'dayjs'

export function columns({ dicts }: any) {
  return [
    {
      type: 'selection',
      fixed: 'left',
      align: 'center',
      width: 50,
    },
    {
      key: 'title',
      title: '标题',
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
      key: 'author',
      title: '作者',
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
  ]
}
