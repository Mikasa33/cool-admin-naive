import { login as loginApi, refreshToken as refreshTokenApi } from '@/apis/open'
import { getPerson } from '@/apis/comm'
import storage from '@/utils/storage'

interface loginData {
  token: string
  expire: number
  refreshToken: string
  refreshExpire: number
}

const data = storage.info()

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const token = ref<string>(data.token)
  const info = ref<any | null>()

  function setToken(data: loginData) {
    token.value = data.token
    storage.set('token', data.token, data.expire)
    storage.set('refreshToken', data.refreshToken, data.refreshExpire)
  }

  async function refreshToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      refreshTokenApi({ refreshToken: storage.get('refreshToken') })
        .then((res: loginData) => {
          setToken(res)
          resolve(res.token)
        })
        .catch((err: any) => {
          logout()
          reject(err)
        })
    })
  }

  async function getInfo() {
    const res = await getPerson()
    setInfo(res)
  }

  function setInfo(val: any) {
    info.value = val
    storage.set('userInfo', val)
  }

  function clear() {
    storage.remove('token')
    storage.remove('userInfo')
    token.value = ''
    info.value = null
  }

  function logout() {
    clear()
    router.push('/login')
  }

  async function login(data: any) {
    const res: loginData = await loginApi(data)
    setToken(res)
    // await getInfo()

    // const menuStore = useMenuStore()

    // await menuStore.getMenu()

    router.push('/')
  }

  return {
    token,
    info,
    setToken,
    refreshToken,
    getInfo,
    setInfo,
    clear,
    logout,
    login,
  }
})
