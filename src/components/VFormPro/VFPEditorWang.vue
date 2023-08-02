<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = withDefaults(defineProps<{
  value?: string
  disabled?: boolean
  height?: string
  mode?: 'default' | 'simple'
}>(), {
  disabled: false,
  height: '300px',
  mode: 'default',
})

const emit = defineEmits(['update:value'])

const temp: { insertFn: ((url: string) => void) | null } = {
  insertFn: null,
}

const editorRef = shallowRef()
const editorConfig = {
  placeholder: '请输入内容',
  MENU_CONF: {
    uploadImage: {
      customBrowseAndUpload(fn: any) {
        temp.insertFn = fn
        console.log('TODO: 上传图片')
      },
    },
    uploadVideo: {
      customBrowseAndUpload(fn: any) {
        temp.insertFn = fn
        console.log('TODO: 上传视频')
      },

    },
  },
}
const modelValue = ref()

watch(
  () => props.disabled,
  (val: boolean) => {
    if (val)
      unref(editorRef)?.disable()
    else
      unref(editorRef)?.enable()
  },
  {
    immediate: true,
  },
)

watch(
  () => props.value,
  (val: any) => {
    modelValue.value = val || ''
  },
  {
    immediate: true,
  },
)

function handleCreated(editor: any) {
  editorRef.value = editor
}

function handleChange() {
  emit('update:value', unref(modelValue))
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})
</script>

<template>
  <div class="border border-[rgb(224,224,230)] rounded-3px">
    <Toolbar
      :editor="editorRef"
      :mode="mode"
      class="border-b border-[rgb(224,224,230)]"
    />
    <Editor
      v-model="modelValue"
      :default-config="editorConfig"
      :mode="mode"
      :style="{ height }"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
