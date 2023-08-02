import { isFunction, isUndefined } from 'lodash-es'
import type { IFormSchemaProps, visibleType } from '../types'
import { isSelectComponent } from '../helper'

export function useHelper(schema: IFormSchemaProps, model: any) {
  function isVisible(visible: visibleType | undefined) {
    return isUndefined(visible) || visible === 'visible'
  }

  function getProps() {
    let { label, component, props } = schema

    if (isFunction(props))
      props = props({ model: unref(model), field: schema.field })

    if (!props)
      props = {}

    const { placeholder } = props
    if (!placeholder) {
      props.placeholder = `请输入${label ?? ''}`

      if (isSelectComponent(component))
        props.placeholder = `请选择${label ?? ''}`
    }

    return props
  }

  function getSlots(slots: any) {
    if (isFunction(slots))
      slots = slots({ model: unref(model), field: schema.field })

    if (!slots)
      slots = {}

    return slots
  }

  return {
    isVisible,
    getProps,
    getSlots,
  }
}
