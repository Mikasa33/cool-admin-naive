import { get, post } from '@/utils/request'

export function getPerson() {
  return get('/admin/base/comm/person')
}

export function updatePerson(data: any) {
  return post('/admin/base/comm/personUpdate', { data })
}

export function listPermmenu() {
  return get('/admin/base/comm/permmenu')
}

export function getUploadMode() {
  return get('/admin/base/comm/uploadMode')
}

export function uploadFile(data: any) {
  return post('/admin/base/comm/upload', data)
}
