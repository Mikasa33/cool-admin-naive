import { orderBy } from 'lodash-es'
import { dictInfo } from '@/apis/system/dict'
import { deepTree } from '@/utils'

export function schemas({ typeId }: { typeId: number }) {
  return [
    {
      field: 'id',
      show: false,
    },
    {
      field: 'typeId',
      show: false,
      defaultValue: typeId,
    },
    {
      field: 'parentId',
      label: '上级字典',
      component: 'VTreeSelect',
      componentProps: {
        defaultExpandAll: true,
        keyField: 'id',
        labelField: 'name',
        load: async () => {
          const list = await dictInfo.list({ typeId })
          return orderBy(deepTree(list), ['orderNum'], ['desc'])
        },
      },
    },
    {
      field: 'name',
      label: '名称',
      component: 'NInput',
      rules: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
    },
    {
      field: 'orderNum',
      label: '排序',
      component: 'NInputNumber',
      componentProps: {
        min: 0,
        class: 'w-full',
      },
      defaultValue: 0,
    },
    {
      field: 'remark',
      label: '备注',
      component: 'NInput',
      componentProps: {
        type: 'textarea',
      },
    },
  ]
}
