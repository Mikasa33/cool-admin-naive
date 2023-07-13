import { crud } from '@/utils/request'

export const category = {
  ...crud({ namespace: '/admin/product/category' }),
}
