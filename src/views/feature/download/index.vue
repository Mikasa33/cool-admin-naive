<script setup lang="ts">
import imgBase64 from './imgBase64'
import {
  downloadByBase64,
  downloadByData,
  downloadByOnlineUrl,
  downloadByUrl,
} from '@/utils/file/download'

const getName = new Date().valueOf()

function downloadFile() {
  downloadByData('测试下载文件流', `${getName}-file.txt`)
}

function downloadFileUrl() {
  downloadByUrl({
    url: '/logo.png',
    target: '_self',
  })
}

function downloadFileBase64() {
  downloadByBase64(imgBase64, `${getName}.png`)
}

function downloadFileImgUrl() {
  downloadByOnlineUrl('/logo.png', `${getName}.png`)
}
</script>

<template>
  <div class="m-16px">
    <NCard
      title="文件下载"
      :bordered="false"
      size="small"
    >
      <div>文件下载示例，用于各种场景下载文件或者图片</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="后台接口文件流下载"
        type="success"
      >
        <NButton
          type="primary"
          class="!mt-8px"
          @click="downloadFile"
        >
          文件流下载
        </NButton>
      </NAlert>
      <NAlert
        :show-icon="false"
        title="文件地址下载"
        type="success"
        class="mt-16px"
      >
        <NButton
          type="primary"
          class="!mt-8px"
          @click="downloadFileUrl"
        >
          文件地址下载
        </NButton>
      </NAlert>
      <NAlert
        :show-icon="false"
        title="base64 流下载"
        type="success"
        class="mt-16px"
      >
        <NButton
          type="primary"
          class="!mt-8px"
          @click="downloadFileBase64"
        >
          base64 流下载
        </NButton>
      </NAlert>
      <NAlert
        :show-icon="false"
        title="图片 Url 下载，如果有跨域问题，需要先处理图片跨域，才能下载"
        type="success"
        class="mt-16px"
      >
        <NButton
          type="primary"
          class="!mt-8px"
          @click="downloadFileImgUrl"
        >
          图片 Url 下载
        </NButton>
      </NAlert>
    </NCard>
  </div>
</template>
