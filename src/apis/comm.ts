import { get, post } from '@/utils/request'

export function getPerson() {
  return get('/admin/base/comm/person')
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
