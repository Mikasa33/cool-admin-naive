<script setup lang="ts">
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { customAlphabet } from 'nanoid'
import { isArray } from 'lodash-es'
import { getUploadMode, uploadFile } from '@/apis/comm'
import { fileType } from '@/utils/file'

const props = withDefaults(defineProps<{
  value?: any
  showFileList?: boolean
  limitSize?: number
  directoryDnd?: boolean
  listType?: 'text' | 'image' | 'image-card'
}>(), {
  value: [],
  showFileList: false,
  limitSize: 10,
  directoryDnd: false,
  listType: 'text',
})

const emit = defineEmits(['update:value', 'finish'])

const attrs: any = useAttrs()
const message = useMessage()

const nanoid = customAlphabet('1234567890abcdef', 36)

const list = ref<any[]>([])

watch(
  () => props.value,
  (val: any) => {
    if (!val)
      return

    if (isArray(val)) {
      list.value = val.map((item: any) => ({
        url: item,
        status: 'finished',
      }))
    }
    else {
      list.value = [{
        url: val,
        status: 'finished',
      }]
    }
  },
  {
    immediate: true,
  },
)

const showFileList = computed(() => props.listType === 'image-card' ? true : props.showFileList ? !!unref(list).length : false)

async function customRequest({ file, onFinish, onError, onProgress }: UploadCustomRequestOptions) {
  let mode = 'local'

  try {
    const result = await getUploadMode()
    mode = result.mode
  }
  catch (err) {
    message.error('获取上传模式异常')
    onError()
  }

  const fileId = nanoid()
  const fileName = `${fileId}_${file.name}`

  const formData = new FormData()
  formData.append('key', fileName)
  formData.append('file', file.file as File)

  try {
    const result = await uploadFile({
      data: formData,
      timeout: 600000,
      onUploadProgress(e: { loaded: number; total: number }) {
        onProgress({ percent: Math.ceil((e.loaded / e.total) * 100) })
      },
    })

    file.url = result

    const fl: any = {
      fileId,
      name: fileName,
      type: fileType(fileName)?.value,
      size: file.file?.size,
    }
    if (mode === 'local') {
      fl.url = result
      fl.key = result?.replace(/^https?:\/\/[^\/]+/, '')
    }
    else {
      // file.url = `${preview || host}/${fileName}`
      fl.key = fileName
    }

    message.success('上传成功')
    onFinish()
    emit('update:value', attrs.max !== 1 ? unref(list).map((item: any) => item.url) : unref(list)?.[0].url)
    emit('finish', fl)
  }
  catch (err) {
    message.error('上传异常')
    onError()
  }
}

function handleBeforeUpload({ file, fileList }: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  if (attrs.onBeforeUpload) {
    if (!attrs.onBeforeUpload({ file, fileList }))
      return false
  }
  else {
    if ((file.file as File).size / 1024 / 1024 >= props.limitSize) {
      message.error(`上传文件大小不能超过 ${props.limitSize}MB`)
      return false
    }
  }

  if (attrs.max === 1)
    list.value = []

  return true
}

function handleRemove({ file, fileList }: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  const index = unref(list).findIndex((item: any) => item.id === file?.id)
  unref(list).splice(index, 1)

  if (attrs.onRemove)
    return attrs.onRemove({ file, fileList })

  return true
}
</script>

<template>
  <NUpload
    v-bind="$attrs"
    v-model:file-list="list"
    :show-file-list="showFileList"
    :custom-request="customRequest"
    :list-type="listType"
    :file-list-style="listType === 'image-card' ? undefined : { padding: '8px', border: '1px solid rgb(239, 239, 245)', borderRadius: '3px' }"
    class="v-upload"
    @before-upload="handleBeforeUpload"
    @remove="handleRemove"
  >
    <slot v-if="$slots.default" />
    <NUploadDragger v-else-if="directoryDnd">
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <div class="i-icon-park-outline-inbox-out text-36px" />
        </n-icon>
      </div>
      <NText class="text-16px">
        点击或者拖动文件到该区域来上传
      </NText>
    </NUploadDragger>
    <NButton
      v-else-if="listType !== 'image-card'"
      type="primary"
    >
      上 传
    </NButton>
  </NUpload>
</template>

<style lang="less" scoped>
.v-upload {
  :deep(.n-upload-file-info) {
    .n-image {
      width: 100%;
      height: 100%;

      img {
        object-fit: cover !important;
      }
    }
  }
}
</style>
