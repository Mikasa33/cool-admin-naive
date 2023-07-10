<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div class="m-16px">
    <NCard
      title="水印"
      :bordered="false"
      size="small"
    >
      <div>屏幕上显示水印信息</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="全屏幕"
        type="success"
      >
        <NSwitch
          v-model:value="show"
          class="mt-16px"
        />
      </NAlert>
    </NCard>

    <NWatermark
      v-if="show"
      content="核心机密"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="200"
      :height="200"
      :x-offset="12"
      :y-offset="20"
      :rotate="-15"
    />
  </div>
</template>
