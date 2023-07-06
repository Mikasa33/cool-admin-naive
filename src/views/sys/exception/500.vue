<script setup lang="ts">
const router = useRouter()

function handleClick() {
  router.push('/')
}
</script>

<template>
  <div class="mt-10% flex-center">
    <NResult
      status="500"
      title="500"
      description="糟糕，出了点问题"
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
