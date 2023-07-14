import { NCard, NCascader, NDatePicker, NDynamicTags, NInput, NInputNumber, NSwitch } from 'naive-ui'
import VCheckbox from './VCheckbox.vue'
import VEditorWang from './VEditorWang.vue'
import VGrid from './VGrid.vue'
import VRadio from './VRadio.vue'
import VIconSelect from './VIconSelect.vue'
import VSelect from './VSelect.vue'
import VTabs from './VTabs.vue'
import VTree from './VTree.vue'
import VTreeSelect from './VTreeSelect.vue'
import VUpload from './VUpload.vue'

type ComponentType = 'NCard' | 'NCascader' | 'NDatePicker' | 'NDynamicTags' | 'NInput' | 'NInputNumber' | 'NSwitch'
| 'VCheckbox' | 'VEditorWang' | 'VGrid' | 'VRadio' | 'VIconSelect'
| 'VSelect' | 'VTabs' | 'VTree' | 'VTreeSelect' | 'VUpload'

export const componentMap = new Map<ComponentType, Component>()
componentMap.set('NCard', NCard)
componentMap.set('NCascader', NCascader)
componentMap.set('NInput', NInput)
componentMap.set('NInputNumber', NInputNumber)
componentMap.set('NDatePicker', NDatePicker)
componentMap.set('NDynamicTags', NDynamicTags)
componentMap.set('NSwitch', NSwitch)
componentMap.set('VCheckbox', VCheckbox)
componentMap.set('VEditorWang', VEditorWang)
componentMap.set('VGrid', VGrid)
componentMap.set('VRadio', VRadio)
componentMap.set('VIconSelect', VIconSelect)
componentMap.set('VSelect', VSelect)
componentMap.set('VTabs', VTabs)
componentMap.set('VTree', VTree)
componentMap.set('VTreeSelect', VTreeSelect)
componentMap.set('VUpload', VUpload)
