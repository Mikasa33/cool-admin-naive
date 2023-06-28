import { crud, post } from '@/utils/request'

const namespace = '/admin/recycle/data'

export const recycle = {
  ...crud({ namespace }),
  restore: (data: any) => post(`${namespace}/restore`, { data }),
}
