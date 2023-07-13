import { NSwitch } from 'naive-ui'
import dayjs from 'dayjs'
import { category } from '@/apis/article/category'

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
    key: 'orderNum',
    title: '排序',
    align: 'center',
  },
  {
    key: 'status',
    title: '状态',
    align: 'center',
    render(row: any) {
      return h(NSwitch, {
        value: row.status,
        uncheckedValue: 0,
        checkedValue: 1,
        onUpdateValue: async (val: number) => {
          try {
            row.status = val
            await category.update({ ...row, status: val })
          }
          catch (err) {
            row.status = !val
          }
        },
      })
    },
  },
  {
    key: 'createTime',
    title: '创建时间',
    align: 'center',
    render(row: any) {
      return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
]
