<script setup lang="ts">
const icon = ref('')
</script>

<template>
  <div class="m-16px">
    <NCard
      title="图标"
      :bordered="false"
      size="small"
    >
      <div>推荐使用 Iconify 作为图标库。</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="图标使用"
        type="success"
      >
        <NSpace class="mt-16px">
          <div class="i-icon-park-outline-github text-24px" />
          <div class="i-icon-park-outline-alipay text-24px text-blue-500" />
          <div class="i-icon-park-outline-bytedance text-24px text-green-500" />
        </NSpace>
      </NAlert>

      <NAlert
        :show-icon="false"
        title="图标选择器"
        type="success"
        class="mt-16px"
      >
        <VIconSelect v-model:value="icon" class="!mt-8px" />
      </NAlert>
    </NCard>
  </div>
</template>
