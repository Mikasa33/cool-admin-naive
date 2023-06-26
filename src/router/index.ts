import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default/index.vue'
import CustomLayout from '@/layouts/custom/index.vue'
import storage from '@/utils/storage'

const { loadingBar } = useDiscreteApi()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Root',
      path: '/',
      redirect: '/workbench',
      component: DefaultLayout,
      children: [],
    },
    {
      name: 'Custom',
      path: '/',
      component: CustomLayout,
      children: [
        {
          name: 'Login',
          path: '/login',
          component: () => import('@/views/sys/login/index.vue'),
          meta: {
            title: '登录',
            ignore: true,
          },
        },
        {
          name: 'NotFound',
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/sys/exception/404.vue'),
          meta: {
            title: '404',
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  loadingBar.start()

  const userStore = useUserStore()
  const menuStore = useMenuStore()

  // 忽略 Token 验证的页面
  if (to.meta.ignore)
    return next()

  // 未登录
  if (!userStore.token)
    return next('/login')

  // 跳转页面为登录页面，并且 Token 未过期
  if (to.path.includes('/login') && !storage.isExpired('token'))
    return next('/')

  // 没有用户信息
  if (!userStore.info)
    await userStore.getInfo()

  // 没有菜单信息
  if (!menuStore.isDynamicAddedRoute) {
    const routes: any[] = await menuStore.getRoutes()

    routes.forEach((route: any) => {
      router.addRoute(route as RouteRecordRaw)
    })

    menuStore.setDynamicAddedRoute(true)

    return next({ path: to.fullPath, replace: true, query: to.query })
  }

  next()
})

router.afterEach(() => {
  loadingBar.finish()
})

export default router
