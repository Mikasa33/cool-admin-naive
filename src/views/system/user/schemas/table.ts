import { NImage, NSwitch } from 'naive-ui'
import dayjs from 'dayjs'
import { user } from '@/apis/system/user'

export const columns = [
  {
    type: 'selection',
    fixed: 'left',
    align: 'center',
    width: 50,
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
    key: 'username',
    title: '用户名',
    align: 'center',
    width: 160,
  },
  {
    key: 'name',
    title: '姓名',
    align: 'center',
    width: 160,
  },
  {
    key: 'nickName',
    title: '昵称',
    align: 'center',
    width: 160,
  },
  {
    key: 'departmentName',
    title: '部门名称',
    align: 'center',
    width: 160,
  },
  {
    key: 'roleName',
    title: '角色',
    align: 'center',
    width: 160,
  },
  {
    key: 'status',
    title: '状态',
    align: 'center',
    width: 80,
    render(row: any) {
      return h(NSwitch, {
        value: row.status,
        uncheckedValue: 0,
        checkedValue: 1,
        onUpdateValue: async (val: number) => {
          try {
            row.status = val
            await user.update({ ...row, status: val })
          }
          catch (err) {
            row.status = !val
          }
        },
      })
    },
  },
  {
    key: 'phone',
    title: '手机号',
    align: 'center',
    width: 160,
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
