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
          status="info"
          title="提示"
          description="本次提交，将在24小时候内自动转入对方账户，如操作失误，请及时撤回"
        >
          <div class="result-box-extra">
            <p>您提交的内容如下：</p>
            <p class="mt-3">
              <NSpace align="center">
                <div class="i-icon-park-outline-check-one text-#18a058" />
                <span>转入支付宝账户（189****5426）：￥1980元</span>
                <NButton
                  type="primary"
                  text
                >
                  立即撤回
                </NButton>
              </NSpace>
            </p>
            <p class="mt-3">
              <NSpace align="center">
                <div class="i-icon-park-outline-check-one text-#18a058" />
                <span>转入支付宝账户（187****5426）：￥2980元</span>
                <NButton
                  type="primary"
                  text
                >
                  立即撤回
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
                <NButton>全部撤回</NButton>
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
