import { crud } from '@/utils/request'

export const fileType = {
  ...crud({ namespace: '/admin/space/type' }),
}

export const fileInfo = {
  ...crud({ namespace: '/admin/space/info' }),
}
