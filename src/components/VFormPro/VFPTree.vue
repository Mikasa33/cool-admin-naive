<script setup lang="ts">
import { deepTree } from '@/utils'

const props = withDefaults(defineProps<{
  value?: any[]
  useSearch?: boolean
  load?: Function
}>(), {
  value: () => [],
  useSearch: true,
})

const emit = defineEmits(['update:value'])

const [loading, toggleLoading] = useToggle()

const pattern = ref('')
const data = ref<any[]>([])

async function load() {
  if (!props.load)
    return

  try {
    toggleLoading(true)
    const result = await props.load()
    data.value = deepTree(result)
  }
  catch (err) {

  }
  finally {
    toggleLoading(false)
  }
}

function handleUpdateCheckedKeys(val: any[]) {
  emit('update:value', val)
}

onMounted(() => {
  if (!props.value)
    handleUpdateCheckedKeys([])

  load()
})
</script>

<template>
  <div class="w-full">
    <NInput
      v-if="useSearch"
      v-model:value="pattern"
      placeholder="请输入关键字进行筛选"
      clearable
      class="mb-8px"
    />
    <NCard
      size="small"
      :content-style="{ padding: '0' }"
      class="!border-[rgb(224,224,230)]"
    >
      <NSpin
        v-if="loading"
        size="small"
      >
        <div class="h-80px" />
      </NSpin>
      <NScrollbar
        v-else-if="data.length"
        class="max-h-200px"
      >
        <NTree
          v-bind="$attrs"
          :checked-keys="value"
          :data="data"
          :pattern="pattern"
          :show-irrelevant-nodes="false"
          :selectable="false"
          checkable
          block-line
          expand-on-click
          class="px-8px py-4px"
          @update:checked-keys="handleUpdateCheckedKeys"
        />
      </NScrollbar>
      <NEmpty v-else />
    </NCard>
  </div>
</template>
