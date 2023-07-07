import { menuType } from './table'
import { menu } from '@/apis/system/menu'
import { deepPaths, deepTree } from '@/utils'

function findFiles() {
  const files = import.meta.glob(['/src/views/**/*.vue', '!**/components'])
  const list: string[] = []

  for (const i in files) {
    if (!i.includes('/sys/'))
      list.push(i.substring(10))
  }

  return deepPaths(list)
}

export const schemas = [
  {
    field: 'id',
    show: false,
  },
  {
    field: 'type',
    label: '类型',
    component: 'VRadio',
    componentProps: {
      options: menuType,
    },
    defaultValue: 0,
  },
  {
    field: 'name',
    label: '名称',
    component: 'NInput',
    rules: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'VTreeSelect',
    componentProps: {
      keyField: 'id',
      labelField: 'name',
      load: async () => {
        const list = await menu.list()
        return deepTree(list.filter((item: any) => item.type !== 2))
      },
    },
    hook: {
      set: ({ model }: any) => {
        model.parentId = model.parentId ? Number(model.parentId) : null
      },
    },
  },
  {
    field: 'router',
    label: '路由',
    component: 'NInput',
    ifShow: ({ model }: any) => model.type !== 2,
  },
  // {
  //   field: 'keepAlive',
  //   label: '路由缓存',
  //   component: 'NSwitch',
  //   componentProps: {
  //     checkedValue: 1,
  //     uncheckedValue: 0,
  //   },
  //   defaultValue: 1,
  // },
  {
    field: 'isShow',
    label: '是否显示',
    component: 'NSwitch',
    defaultValue: true,
    ifShow: ({ model }: any) => model.type !== 2,
  },
  {
    field: 'viewPath',
    label: '文件路径',
    component: 'NCascader',
    componentProps: {
      options: findFiles(),
      checkStrategy: 'child',
    },
    hook: {
      get: ({ model }: any) => {
        model.viewPath = `/views${model.viewPath}`
      },
      set: ({ model }: any) => {
        model.viewPath = model.viewPath.replace(/\/views/g, '')
      },
    },
    rules: { required: true, message: '请选择文件路径', trigger: ['blur', 'input'] },
    ifShow: ({ model }: any) => model.type === 1,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'VIconSelect',
    ifShow: ({ model }: any) => model.type !== 2,
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
    field: 'perms',
    label: '权限',
    component: 'NDynamicTags',
    hook: {
      get: ({ model }: any) => {
        model.perms = model.perms?.toString()
      },
      set: ({ model }: any) => {
        model.perms = model.perms?.split(',')
      },
    },
    ifShow: ({ model }: any) => model.type === 2,
  },
]
