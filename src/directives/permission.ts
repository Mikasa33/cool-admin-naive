import { isUndefined } from 'lodash-es'
import type { ObjectDirective } from 'vue'

function change(el: any, binding: any) {
  if (isUndefined(binding.value))
    return

  let action, effect
  if (binding.value.action) {
    action = binding.value.action
    effect = binding.value.effect
  }
  else {
    action = binding.value
  }

  const { hasPermission } = usePermission()
  if (!hasPermission(action)) {
    if (effect === 'disabled') {
      el.disabled = true
      el.style.disabled = 'disabled'
      el.classList.add('n-button--disabled')
    }
    else if (effect === 'none') {
      el.style.display = 'none'
    }
    else {
      el.remove()
    }
  }
}

export const permission: ObjectDirective = {
  created: change,
  updated: change,
}
