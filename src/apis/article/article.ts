import { crud } from '@/utils/request'

export const article = {
  ...crud({ namespace: '/admin/article/article' }),
}
