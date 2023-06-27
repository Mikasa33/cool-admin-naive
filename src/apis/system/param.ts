import { crud } from '@/utils/request'

export const param = {
  ...crud({ namespace: '/admin/base/sys/param' }),
}
