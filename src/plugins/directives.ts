import type { App } from 'vue'

import { permission } from '@/directives/permission'

export function setupDirectives(app: App) {
  app.directive('permission', permission) // 权限控制指令
}
