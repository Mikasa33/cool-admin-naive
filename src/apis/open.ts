import { get, post } from '@/utils/request'

export function getCaptcha() {
  return get('/admin/base/open/captcha', {
    params: {
      width: 120,
      height: 34,
    },
  })
}

export function login(data: any) {
  return post('/admin/base/open/login', { data })
}

export function refreshToken(params: any) {
  return get('/admin/base/open/refreshToken', { params })
}
