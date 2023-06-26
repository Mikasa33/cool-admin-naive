import { crud } from '@/utils/request'

export const menu = {
  ...crud({ namespace: '/admin/base/sys/menu' }),
}
