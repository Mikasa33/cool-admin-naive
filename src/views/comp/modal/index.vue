<script setup lang="ts">
const modal1Ref = ref()
const modal2Ref = ref()
const modal3Ref = ref()

function open1() {
  unref(modal1Ref).open()
}

function open2() {
  unref(modal2Ref).open()
}

function open3() {
  unref(modal3Ref).open()
}
</script>

<template>
  <div class="m-16px">
    <NCard
      title="弹窗"
      :bordered="false"
      size="small"
    >
      <div>模态框，用于向用户收集或展示信息，Modal 采用 Card 预设，扩展拖拽效果。</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="可拖拽"
        type="success"
      >
        <NButton
          type="primary"
          class="!mt-8px"
          @click="open1"
        >
          打开弹窗
        </NButton>
        <VModal
          ref="modal1Ref"
          title="可拖拽"
        >
          内容内容内容
        </VModal>
      </NAlert>

      <NAlert
        :show-icon="false"
        title="禁止拖拽"
        type="success"
        class="mt-16px"
      >
        <NButton
          type="primary"
          class="!mt-8px"
          @click="open2"
        >
          打开弹窗
        </NButton>
        <VModal
          ref="modal2Ref"
          title="禁止拖拽"
          :drag="false"
        >
          内容内容内容
        </VModal>
      </NAlert>

      <NAlert
        :show-icon="false"
        title="禁止全屏"
        type="success"
        class="mt-16px"
      >
        <NButton
          type="primary"
          class="!mt-8px"
          @click="open3"
        >
          打开弹窗
        </NButton>
        <VModal
          ref="modal3Ref"
          title="禁止全屏"
          :fullscreen="false"
        >
          内容内容内容
        </VModal>
      </NAlert>
    </NCard>
  </div>
</template>
