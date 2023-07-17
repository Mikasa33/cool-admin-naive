import { crud, post } from '@/utils/request'

const namespace = '/admin/task/info'

export const task = {
  ...crud({ namespace }),
  start: (data: any) => post(`${namespace}/start`, { data }),
  stop: (data: any) => post(`${namespace}/stop`, { data }),
}
