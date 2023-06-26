import { orderBy } from 'lodash-es'
import DefaultLayout from '@/layouts/default/index.vue'
import { listPermmenu } from '@/apis/comm'
import { deepTree } from '@/utils'
import { renderIcon } from '@/utils/icon'

enum MenuType {
  '目录' = 0,
  '菜单' = 1,
  '权限' = 2,
}

let layouts: any
let views: any

export const useMenuStore = defineStore('menu', () => {
  const isDynamicAddedRoute = ref(false)
  const list = ref<any[]>([])

  function setDynamicAddedRoute(val: boolean) {
    isDynamicAddedRoute.value = val
  }

  function transformObjToMenu(routes: any[]) {
    const ms: any[] = []

    for (let i = 0; i < routes.length; i++) {
      const { name, icon, router, type, isShow } = routes[i]

      if (!isShow)
        continue

      const m = {
        ...routes[i],
        key: router,
        title: name,
        tp: type,
        icon: renderIcon(icon),
      }

      delete m.type

      ms.push(m)
    }

    return orderBy(deepTree(ms), 'orderNum')
  }

  function transformObjToRoute(routes: any[]): any[] {
    layouts = layouts || import.meta.glob(['/src/layouts/**/*', '!**/components'])
    views = views || import.meta.glob(['/src/views/**/*', '!**/components'])

    const rs = []
    for (let i = 0; i < routes.length; i++) {
      let { parentId, tp, title, icon, children, router, viewPath, layout } = routes[i]
      const layoutComponent = layouts[`/src${layout}`] || DefaultLayout
      const component = views[`/src${viewPath}`]

      const meta = {
        title,
        icon,
      }

      children = children?.length ? transformObjToRoute(children) : []

      if (tp === 0) {
        rs.push({
          name: router,
          path: router,
          redirect: children?.[0].path || children?.[0].redirect,
          component: !parentId && layoutComponent,
          meta,
          children,
        })
      }
      else if (tp === 1) {
        if (parentId) {
          rs.push({
            name: router,
            path: router,
            component,
            meta,
            children,
          })
        }
        else {
          rs.push({
            name: `/layout${router}`,
            path: `/layout${router}`,
            redirect: router,
            component: layoutComponent,
            meta: {
              hideBreadcrumb: true,
            },
            children: [
              {
                name: router,
                path: router,
                component,
                meta,
              },
            ],
          })
        }
      }
    }

    return rs
  }

  async function getRoutes() {
    const { message } = useDiscreteApi()
    const msg = message.loading('加载菜单中...', {
      duration: 0,
    })

    const { menus } = await listPermmenu()

    list.value = transformObjToMenu(menus.filter((menu: any) => menu.type !== 2))

    const routes = transformObjToRoute(unref(list))

    msg.destroy()

    return routes
  }

  return {
    isDynamicAddedRoute,
    list,
    setDynamicAddedRoute,
    getRoutes,
  }
})
