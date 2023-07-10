<script setup lang="ts">
import printJS from 'print-js'

function jsonPrint() {
  printJS({
    printable: [
      { name: '汪伟', email: '735869@gmail.com', phone: '186****5653' },
      { name: '雷秀英', email: '235656452@gmail.com', phone: '135****6536' },
      { name: '邹芳', email: '24586526@gmail.com', phone: '159****5869' },
    ],
    properties: ['name', 'email', 'phone'],
    type: 'json',
  })
}

function imagePrint() {
  printJS({
    printable: [
      '/logo.png',
      '/logo.png',
    ],
    type: 'image',
    header: 'Multiple Images',
    imageStyle: 'width:100%;',
  })
}
</script>

<template>
  <div class="m-16px">
    <NCard
      title="打印场景"
      :bordered="false"
      size="small"
    >
      <div>json打印表格，图片打印</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="复制"
        type="success"
      >
        <NSpace class="mt-16px">
          <NButton
            type="primary"
            @click="jsonPrint"
          >
            打印表格
          </NButton>
          <NButton
            type="primary"
            @click="imagePrint"
          >
            打印图片
          </NButton>
        </NSpace>
      </NAlert>
    </NCard>
  </div>
</template>
