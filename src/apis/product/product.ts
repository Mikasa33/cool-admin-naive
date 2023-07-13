import { crud } from '@/utils/request'

export const product = {
  ...crud({ namespace: '/admin/product/product' }),
}
