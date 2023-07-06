import { crud } from '@/utils/request'

export const user = {
  ...crud({ namespace: '/admin/user/info' }),
}
