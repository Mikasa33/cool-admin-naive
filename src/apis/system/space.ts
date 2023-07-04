import { crud } from '@/utils/request'

export const spaceType = {
  ...crud({ namespace: '/admin/space/type' }),
}

export const spaceInfo = {
  ...crud({ namespace: '/admin/space/info' }),
}
