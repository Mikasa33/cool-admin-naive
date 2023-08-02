import type { ButtonProps } from 'naive-ui'

export interface ModalProps {
  title?: string
  loading?: boolean
  width?: number | string
  showAction?: boolean
  showConfirmAction?: boolean
  showCancelAction?: boolean
  actions?: any[]
  confirmLabel?: string
  confirmType?: ButtonProps['type']
  confirmLoading?: boolean
  cancelLabel?: string
  cancelType?: string
  cancelLoading?: boolean
  isCrud?: boolean
  drag?: boolean
  fullscreen?: boolean
}
