import { isArray, orderBy } from 'lodash-es'

export function revisePath(path: string) {
  if (!path)
    return ''

  return path[0] === '/' ? path : `/${path}`
}

// 列表转树形
export function deepTree(list: any[], order?: 'asc' | 'desc'): any[] {
  const newList: any[] = []
  const map: any = {}

  list.forEach(e => (map[e.id] = e))

  list.forEach((e) => {
    const parent = map[e.parentId]

    if (parent)
      (parent.children || (parent.children = [])).push(e)

    else
      newList.push(e)
  })

  const fn = (list: Array<any>) => {
    list.forEach((e) => {
      if (isArray(e.children)) {
        e.children = orderBy(e.children, 'orderNum', order)
        fn(e.children)
      }
    })
  }

  // fn(newList)

  return orderBy(newList, 'orderNum', order)
}

// 树形转列表
export function revDeepTree(list: any[]) {
  const arr: any[] = []
  let id = 0

  function deep(list: any[], parentId: number) {
    list.forEach((e) => {
      if (!e.id)
        e.id = ++id

      if (!e.parentId)
        e.parentId = parentId

      arr.push(e)

      if (e.children && isArray(e.children) && e.id)
        deep(e.children, e.id)
    })
  }

  deep(list || [], 0)

  return arr
}

// 路径转数组
export function deepPaths(paths: string[], splitor?: string) {
  const list: any[] = []

  paths.forEach((e) => {
    const arr: string[] = e.split(splitor || '/').filter(Boolean)

    let c = list

    arr.forEach((a, i) => {
      let d = c.find(e => e.label === a)

      if (!d) {
        d = {
          label: a,
          value: arr[i + 1] ? a : e,
          children: arr[i + 1] ? [] : null,
        }

        c.push(d)
      }

      if (d.children)
        c = d.children
    })
  })

  return list
}

export function openWindow(
  url: string,
  opt?: { target?: any; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')
  window.open(url, target, feature.join(','))
}
