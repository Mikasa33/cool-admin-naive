<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import { NSpin } from 'naive-ui'

const props = withDefaults(defineProps<{
  options?: SelectOption[]
  load?: Function
}>(), {
  options: () => [],
})

const [loading, toggleLoading] = useToggle()

const options = ref<SelectOption[]>([])

async function load() {
  if (!props.load) {
    options.value = props.options
    return
  }

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
