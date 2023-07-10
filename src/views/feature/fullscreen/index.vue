<script setup lang="ts">
const { isFullscreen, enter, exit, toggle } = useFullscreen()

const elRef = ref()
const { isFullscreen: isFullscreenEl, toggle: toggleEl } = useFullscreen(elRef)
</script>

<template>
  <div class="m-16px">
    <NCard
      title="全屏"
      :bordered="false"
      size="small"
    >
      <div>全屏幕显示更完美</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="页面全屏"
        type="success"
      >
        <NSpace
          align="center"
          class="mt-16px"
        >
          <NButton
            type="primary"
            @click="enter()"
          >
            打开全屏
          </NButton>
          <NButton
            type="warning"
            @click="exit()"
          >
            关闭全屏
          </NButton>
          <NButton
            type="error"
            @click="toggle()"
          >
            切换全屏
          </NButton>
          <span>状态：{{ isFullscreen }}</span>
        </NSpace>
      </NAlert>

      <NAlert
        ref="elRef"
        :show-icon="false"
        title="Element 全屏"
        type="success"
        class="mt-16px"
      >
        <NSpace
          align="center"
          class="mt-16px"
        >
          <NButton
            type="error"
            @click="toggleEl()"
          >
            切换全屏
          </NButton>
          <span>状态：{{ isFullscreenEl }}</span>
        </NSpace>
      </NAlert>
    </NCard>
  </div>
</template>
