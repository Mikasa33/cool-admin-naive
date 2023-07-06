<script setup lang="ts">
const router = useRouter()

function handleClick() {
  router.push('/')
}
</script>

<template>
  <div class="mt-10% flex-center">
    <NResult
      status="403"
      title="403"
      description="您无权访问此页面"
    >
      <template #footer>
        <NButton
          type="primary"
          @click="handleClick"
        >
          回到首页
        </NButton>
      </template>
    </NResult>
  </div>
</template>
