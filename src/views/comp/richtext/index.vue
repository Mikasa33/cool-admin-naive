<script lang="ts" setup>
const value = ref('内容内容内容')
</script>

<template>
  <div class="m-16px">
    <NCard
      title="富文本"
      :bordered="false"
      size="small"
    >
      <div>富文本，用于展示图文信息，比如商品详情，文章详情等...</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="wangEditor"
        type="success"
      >
        <VEditorWang
          v-model:value="value"
          class="mt-16px"
        />
        <NInput
          :value="value"
          type="textarea"
          readonly
          class="mt-8px"
        />
      </NAlert>
    </NCard>
  </div>
</template>
