import { crud } from '@/utils/request'

export const role = {
  ...crud({ namespace: '/admin/base/sys/role' }),
}
