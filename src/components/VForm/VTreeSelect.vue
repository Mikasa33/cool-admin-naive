<script setup lang="ts">
import type { TreeSelectOption } from 'naive-ui'
import { NSpin, NTreeSelect } from 'naive-ui'

const props = defineProps<{
  load?: Function
}>()

const [loading, toggleLoading] = useToggle()

const options = ref<TreeSelectOption[]>([])

async function load() {
  if (!props.load)
    return

  try {
    toggleLoading(true)
    options.value = await props.load()
  }
  catch (err) {

  }
  finally {
    toggleLoading(false)
  }
}

onMounted(() => {
  load()
})
</script>

<template>
  <NTreeSelect
    v-bind="$attrs"
    :options="options"
  >
    <template #empty>
      <NSpin v-if="loading" size="small" />
      <NEmpty v-else />
    </template>
  </NTreeSelect>
</template>
