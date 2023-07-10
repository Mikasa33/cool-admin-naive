<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="m-16px">
    <NCard :bordered="false">
      <div class="result-box">
        <NResult
          status="error"
          title="操作失败"
          description="请核对并修改以下信息后，再重新提交。"
        >
          <div class="result-box-extra">
            <p>您提交的内容有如下错误：</p>
            <p class="mt-3">
              <NSpace align="center">
                <div class="i-icon-park-outline-info text-#f0a020" />
                <span>认证照片不够清晰</span>
                <NButton
                  type="primary"
                  text
                >
                  立即修改
                </NButton>
              </NSpace>
            </p>
            <p class="mt-3">
              <NSpace align="center">
                <div class="i-icon-park-outline-info text-#f0a020" />
                <span>备注包含敏感字符，并且不能包含政治相关</span>
                <NButton
                  type="primary"
                  text
                >
                  立即修改
                </NButton>
              </NSpace>
            </p>
          </div>
          <template #footer>
            <div class="flex justify-center mb-4">
              <NSpace align="center">
                <NButton
                  type="primary"
                  @click="goHome"
                >
                  回到首页
                </NButton>
                <NButton>查看详情</NButton>
                <NButton>打印</NButton>
              </NSpace>
            </div>
          </template>
        </NResult>
      </div>
    </NCard>
  </div>
</template>

<style lang="less" scoped>
  .result-box {
    width: 72%;
    margin: 0 auto;
    text-align: center;
    padding-top: 5px;

    &-extra {
      padding: 24px 40px;
      text-align: left;
      background: var(--n-border-color);
      border-radius: 3px;
    }
  }
</style>
