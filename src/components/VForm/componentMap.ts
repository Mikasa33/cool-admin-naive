import { NCascader, NDatePicker, NInput, NInputNumber, NSwitch } from 'naive-ui'
import VCheckbox from './VCheckbox.vue'
import VEditorWang from './VEditorWang.vue'
import VRadio from './VRadio.vue'
import VIconSelect from './VIconSelect.vue'
import VSelect from './VSelect.vue'
import VTree from './VTree.vue'
import VTreeSelect from './VTreeSelect.vue'

type ComponentType = 'NCascader' | 'NInput' | 'NInputNumber' | 'NSwitch' | 'NDatePicker' | 'VCheckbox' | 'VEditorWang' | 'VRadio' | 'VIconSelect' | 'VSelect' | 'VTree' | 'VTreeSelect'

export const componentMap = new Map<ComponentType, Component>()
componentMap.set('NCascader', NCascader)
componentMap.set('NInput', NInput)
componentMap.set('NInputNumber', NInputNumber)
componentMap.set('NDatePicker', NDatePicker)
componentMap.set('NSwitch', NSwitch)
componentMap.set('VCheckbox', VCheckbox)
componentMap.set('VEditorWang', VEditorWang)
componentMap.set('VRadio', VRadio)
componentMap.set('VIconSelect', VIconSelect)
componentMap.set('VSelect', VSelect)
componentMap.set('VTree', VTree)
componentMap.set('VTreeSelect', VTreeSelect)
