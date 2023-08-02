import { NCard, NDivider, NFormItem, NInput } from 'naive-ui'
import type { ComponentType, FormComponentType, LayoutComponentType, NestComponentType } from './types'
import VFPCollapse from './VFPCollapse.vue'
import VFPSelect from './VFPSelect.vue'
import VFPTabs from './VFPTabs.vue'
import VFPCheckbox from './VFPCheckbox.vue'
import VFPEditorWang from './VFPEditorWang.vue'
import VFPRadio from './VFPRadio.vue'
import VFPTree from './VFPTree.vue'
import VFPTreeSelect from './VFPTreeSelect.vue'
import VFPUpload from './VFPUpload.vue'

export const selectComponent = new Map<FormComponentType, Component>([
  ['Select', VFPSelect],
  ['Tree', VFPTree],
  ['TreeSelect', VFPTreeSelect],
])

export const formComponents = new Map<FormComponentType, Component>([
  ['Checkbox', VFPCheckbox],
  ['EditorWang', VFPEditorWang],
  ['Input', NInput],
  ['Radio', VFPRadio],
  ['Upload', VFPUpload],
  ...selectComponent,
])

export const nestComponents = new Map<NestComponentType, Component>([
  ['Collapse', VFPCollapse],
  ['Tabs', VFPTabs],
])

export const layoutComponents = new Map<LayoutComponentType, Component>([
  ['Card', NCard],
  ['Divider', NDivider],
  ['FormItem', NFormItem],
  ...nestComponents,
])

export const components = new Map<ComponentType, Component>([
  ...formComponents,
  ...layoutComponents,
])
