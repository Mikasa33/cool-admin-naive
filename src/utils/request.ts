import axios, { type AxiosRequestConfig } from 'axios'
import { endsWith, isUndefined } from 'lodash-es'
import type { MessageType } from 'naive-ui'
import storage from './storage'
import router from '@/router'

interface axiosRequestConfigPro extends AxiosRequestConfig {
  showMessage?: boolean
}

// 请求队列
let queue: Array<(token: string) => void> = []

// 是否刷新中
let isRefreshing = false

function showMessage(msg: string, type?: MessageType) {
  const { message } = useDiscreteApi()
  message[type || 'error'](msg)
}

function isShowMessage(config: axiosRequestConfigPro, msg: string, type?: MessageType) {
  if (config?.showMessage || isUndefined(config?.showMessage))
    showMessage(msg, type)
}

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
})

request.interceptors.request.use((req: any) => {
  const userStore = useUserStore()

  // Token 存在
  if (userStore.token) {
    // 设置请求头信息
    if (req.headers)
      req.headers.Authorization = userStore.token

    // 忽略
    if (['refreshToken'].some(e => endsWith(req.url, e)))
      return req

    // 判断 Token 是否过期
    if (storage.isExpired('token')) {
      // 判断 RefreshToken 是否过期
      if (storage.isExpired('refreshToken')) {
        showMessage('登录状态已失效，请重新登录')
        userStore.logout()
      }
      else {
        // 是否在刷新中
        if (!isRefreshing) {
          isRefreshing = true

          userStore.refreshToken()
            .then((token) => {
              queue.forEach(cb => cb(token))
              queue = []
              isRefreshing = false
            })
            .catch(() => {
              userStore.clear()
            })
        }

        return new Promise((resolve) => {
          // 继续请求
          queue.push((token) => {
            // 重新设置 token
            if (req.headers)
              req.headers.Authorization = token

            resolve(req)
          })
        })
      }
    }
  }

  return req
}, (error) => {
  return Promise.reject(error.message)
})

request.interceptors.response.use((res: any) => {
  if (!res?.data)
    return res

  const { code, data, message } = res.data

  if (!code)
    return res.data

  switch (code) {
    case 1000:
      return data
    default:
      isShowMessage(res.config, message)
      return Promise.reject(new Error(message))
  }
}, (error) => {
  if (error.response) {
    const userStore = useUserStore()

    const { status } = error.response

    if (status === 401) {
      userStore.logout()
    }
    else {
      switch (status) {
        case 403:
          router.push('/403')
          break

        case 500:
          router.push('/500')
          break

        case 502:
          router.push('/502')
          break
      }
    }
  }

  isShowMessage(error.response.config, error.message)

  return Promise.reject(new Error(error.message))
})

export function get(url: string, config?: axiosRequestConfigPro): any {
  return request(url, config)
}

export function post(url: string, config?: axiosRequestConfigPro): any {
  return request(url, { ...config, method: 'POST' })
}

export function put(url: string, config?: axiosRequestConfigPro): any {
  return request(url, { ...config, method: 'PUT' })
}

export function del(url: string, config?: axiosRequestConfigPro): any {
  return request(url, { ...config, method: 'DELETE' })
}

export function crud({ namespace }: { namespace: string }) {
  return {
    page: (data?: any) => post(`${namespace}/page`, { data }),
    list: (data?: any) => post(`${namespace}/list`, { data }),
    info: (data: any) => get(`${namespace}/info`, { params: data }),
    add: (data: any) => post(`${namespace}/add`, { data, showMessage: true }),
    update: (data: any) => post(`${namespace}/update`, { data, showMessage: true }),
    delete: (data: any) => post(`${namespace}/delete`, { data, showMessage: true }),
  }
}

export default request
