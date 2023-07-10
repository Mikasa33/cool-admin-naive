<script setup lang="ts">
const source = ref('')
const { copy } = useClipboard({ source })
</script>

<template>
  <div class="m-16px">
    <NCard
      title="剪贴板"
      :bordered="false"
      size="small"
    >
      <div>文本复制示例，用于常规订单号，编号，快速复制等场景</div>
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
        <NInputGroup class="mt-8px">
          <NInput
            v-model:value="source"
            clearable
          />
          <NButton
            type="primary"
            @click="copy(source)"
          >
            复制
          </NButton>
        </NInputGroup>
      </NAlert>
    </NCard>
  </div>
</template>
