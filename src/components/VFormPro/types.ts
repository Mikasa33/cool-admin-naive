import type { FormItemProps, FormProps, GridItemProps, GridProps } from 'naive-ui'

export type ComponentType = FormComponentType | LayoutComponentType
export type FormComponentType = 'Checkbox' | 'EditorWang' | 'Input' | 'Radio' | 'Select' | 'Tree' | 'TreeSelect' | 'Upload'
export type NestComponentType = 'Collapse' | 'Tabs'
export type LayoutComponentType = 'Card' | 'Divider' | 'FormItem' | NestComponentType

export type visibleType = 'visible' | 'none' | 'hidden'

export interface IFormProps {
  formProps?: FormProps
  gridProps?: GridProps
  schemas?: IFormSchemaProps[]
}
export interface IFormSchemaProps extends IFormComponentProps {
  field?: string
  label?: string
  visible?: visibleType
  itemProps?: FormItemProps
  gridProps?: GridProps
  giProps?: GridItemProps
}
export interface IFormComponentProps {
  component?: ComponentType
  props?: any
  slots?: any
  items?: any
}
