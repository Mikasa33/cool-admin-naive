import { get } from '@/utils/request'

export function getPerson() {
  return get('/admin/base/comm/person')
}

export function listPermmenu() {
  return get('/admin/base/comm/permmenu')
}
