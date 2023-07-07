import { NTag } from 'naive-ui'

export const dataType = [
  { value: 0, label: '字符串', type: 'primary' },
  { value: 1, label: '富文本', type: 'info' },
  { value: 2, label: '文件', type: 'warning' },
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
    key: 'keyName',
    title: '标识',
    align: 'center',
  },
  {
    key: 'dataType',
    title: '类型',
    align: 'center',
    render(row: any) {
      const find = dataType.find((type: any) => type.value === row.dataType)
      if (!find)
        return

      return h(NTag, { type: find.type as TagType, bordered: false }, () => find.label)
    },
  },
  {
    key: 'remark',
    title: '备注',
    align: 'center',
  },
]
