import { crud, post } from '@/utils/request'

const namespace = '/admin/base/sys/user'

export const user = {
  ...crud({ namespace }),
  move: (data: any) => post(`${namespace}/move`, { data }),
}
