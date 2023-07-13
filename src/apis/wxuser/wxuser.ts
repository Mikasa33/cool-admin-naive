import { crud } from '@/utils/request'

export const wxuser = {
  ...crud({ namespace: '/admin/user/info' }),
}
