<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import { NSpin } from 'naive-ui'

const props = defineProps<{
  options?: SelectOption[]
  load?: Function
}>()

const [loading, toggleLoading] = useToggle()

const options = ref<SelectOption[]>([])

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
  <NSelect
    v-bind="$attrs"
    :options="options"
  >
    <template #empty>
      <NSpin v-if="loading" size="small" />
      <NEmpty v-else />
    </template>
  </NSelect>
</template>
