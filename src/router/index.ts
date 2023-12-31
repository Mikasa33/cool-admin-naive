import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default/index.vue'
import CustomLayout from '@/layouts/custom/index.vue'
import storage from '@/utils/storage'
import { renderIcon } from '@/utils/icon'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      name: 'Root',
      path: '/',
      redirect: '/workbench',
      component: DefaultLayout,
      meta: {
        hideBreadcrumb: true,
      },
      children: [
        {
          name: 'SettingUser',
          path: '/setting/user',
          component: () => import('@/views/setting/user.vue'),
          meta: {
            icon: renderIcon('i-icon-park-outline-setting-one'),
            title: '个人设置',
          },
        },
        {
          name: '403',
          path: '/403',
          component: () => import('@/views/exception/403.vue'),
          meta: {
            title: '403',
            hideBreadcrumb: true,
          },
        },
        {
          name: '500',
          path: '/500',
          component: () => import('@/views/exception/500.vue'),
          meta: {
            title: '500',
            hideBreadcrumb: true,
          },
        },
        {
          name: '502',
          path: '/502',
          component: () => import('@/views/exception/502.vue'),
          meta: {
            title: '502',
            hideBreadcrumb: true,
          },
        },
        {
          name: 'NotFound',
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/exception/404.vue'),
          meta: {
            title: '404',
            hideBreadcrumb: true,
          },
        },
      ],
    },
    {
      name: 'Custom',
      path: '/',
      component: CustomLayout,
      children: [
        {
          name: 'Login',
          path: '/login',
          component: () => import('@/views/login/index.vue'),
          meta: {
            title: '登录',
            ignore: true,
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  window.$loadingBar?.start()

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
  window.$loadingBar?.finish()
})

export default router
