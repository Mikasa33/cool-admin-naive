<script setup lang="ts">
import { NUploadDragger } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()

function handleClick() {

}

function handleDragOver() {

}
</script>

<template>
  <div class="w-full">
    <NUpload
      abstract
      directory-dnd
      v-bind="$attrs"
    >
      <NUploadTrigger
        abstract
        #="{ handleClick, handleDragOver }"
      >
        <NUploadDragger
          @dragover="handleDragOver"
        >
          <NSpace
            vertical
            align="center"
            justify="center"
          >
            <div class="i-icon-park-outline-inbox-out mb-8px text-36px" />
            <div>
              点击或拖拽文件到该区域来上传
            </div>
          </NSpace>
        </NUploadDragger>
      </NUploadTrigger>

      <NCard
        size="small"
        class="mt-12px !border-[rgb(224,224,230)]"
      >
        <NUploadFileList />
      </NCard>
    </NUpload>
  </div>
</template>
