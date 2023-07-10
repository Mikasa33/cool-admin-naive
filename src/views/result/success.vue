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
          status="success"
          title="操作成功"
          description="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，灰色区域可以显示一些补充的信息。"
        >
          <div class="result-box-extra">
            <p>已提交申请，等待财务部门审核。</p>
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
