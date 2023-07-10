<script setup lang="ts">
const router = useRouter()

function handleClick() {
  router.push('/')
}
</script>

<template>
  <div class="mt-10% flex-center">
    <NResult
      status="404"
      title="404"
      description="找不到您要查找的页面"
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
