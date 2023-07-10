<script setup lang="ts">
const router = useRouter()

function handleClick() {
  router.push('/')
}
</script>

<template>
  <div class="mt-10% flex-center">
    <NResult
      status="418"
      title="502"
      description="马上回来"
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
