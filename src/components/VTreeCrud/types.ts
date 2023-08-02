export interface TreeCurdProps {
  title?: string
  selectedKeys?: string[] | number[]
  draggable?: boolean
  load: Function
  delete: Function
  isAdd?: boolean
  isUpdate?: boolean
  isDelete?: boolean
  permission?: string
}
