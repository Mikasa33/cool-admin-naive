<script lang="ts" setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { downloadByBase64 } from '@/utils/file/download'

const text = ref('text-to-encode')
const qrcode = useQRCode(text)

function download() {
  downloadByBase64(unref(qrcode), '二维码.png')
}
</script>

<template>
  <div class="m-16px">
    <NCard
      title="二维码"
      :bordered="false"
      size="small"
    >
      <div>二维码组件使用示例，通常用于一些商品、促销活动、或者分享推广二维码展示</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="基础示例"
        type="success"
      >
        <div class="mt-16px">
          <NInput v-model:value="text" />
          <NSpace vertical justify="center" align="center">
            <img :src="qrcode" class="mt-8px h-150px w-150px">
            <NButton type="primary" @click="download">
              下载
            </NButton>
          </NSpace>
        </div>
      </NAlert>
    </NCard>
  </div>
</template>
