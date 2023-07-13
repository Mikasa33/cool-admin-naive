import { crud, post } from '@/utils/request'

const namespace = '/admin/base/sys/department'

export const department = {
  ...crud({ namespace }),
  order: (data: any) => post(`${namespace}/order`, { data }),
}
