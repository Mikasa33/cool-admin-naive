import { crud } from '@/utils/request'

export const dictType = {
  ...crud({ namespace: '/admin/dict/type' }),
}

export const dictInfo = {
  ...crud({ namespace: '/admin/dict/info' }),
}
