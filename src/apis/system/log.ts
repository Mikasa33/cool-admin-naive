import { crud, get, post } from '@/utils/request'

const namespace = '/admin/base/sys/log'

export const log = {
  ...crud({ namespace }),
  clear: () => post(`${namespace}/clear`),
  getKeep: () => get(`${namespace}/getKeep`),
  setKeep: (data: any) => post(`${namespace}/setKeep`, { data }),
}
