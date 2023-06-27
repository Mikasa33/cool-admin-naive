import { NTag } from 'naive-ui'
import dayjs from 'dayjs'

export const menuType = [
  { value: 0, label: '目录', type: 'primary' },
  { value: 1, label: '菜单', type: 'info' },
  { value: 2, label: '权限', type: 'warning' },
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
    width: 200,
    fixed: 'left',
    setting: false,
  },
  {
    key: 'icon',
    title: '图标',
    align: 'center',
    width: 80,
    render(row: any) {
      return h('div', { class: [row.icon, 'w-full'] })
    },
  },
  {
    key: 'type',
    title: '类型',
    align: 'center',
    width: 80,
    render(row: any) {
      const find = menuType.find((item: any) => item.value === row.type)
      if (!find)
        return

      return find ? h(NTag, { type: find.type, bordered: false }, () => find.label) : null
    },
  },
  {
    key: 'router',
    title: '节点路由',
    align: 'center',
    width: 150,
  },
  {
    key: 'viewPath',
    title: '文件路径',
    align: 'center',
    width: 300,
  },
  {
    key: 'isShow',
    title: '显示',
    align: 'center',
    width: 80,
    render(row: any) {
      return h(NTag, { type: row.isShow ? 'success' : 'error', bordered: false }, () => row.isShow ? '显示' : '隐藏')
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
  {
    key: 'orderNum',
    title: '排序',
    align: 'center',
    width: 80,
  },
]
