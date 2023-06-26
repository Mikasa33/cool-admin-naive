<script setup lang="ts">
import { icons, renderIcon } from '@/utils/icon'

defineProps<{
  value?: string
}>()

const emit = defineEmits(['update:value'])

const inputRef = ref()
const { width } = useElementSize(inputRef)
const popoverWidth = computed(() => `${unref(width)}px`)
const [show, toggleShow] = useToggle()

function handleChoose(icon: string) {
  emit('update:value', icon)
  toggleShow(false)
}

onUnmounted(() => {
  toggleShow(false)
})
</script>

<template>
  <NPopover
    v-model:show="show"
    trigger="click"
    :show-arrow="false"
    placement="bottom-start"
    :style="{
      width: popoverWidth,
    }"
  >
    <template #trigger>
      <NInput
        ref="inputRef"
        :value="value"
        v-bind="$attrs"
        readonly
        class="v-icon-select-input"
      />
    </template>

    <NGrid
      :x-gap="8"
      :y-gap="8"
      cols="2 400:4 640:8 1024:12 1280:12 1536:16 1920:24"
    >
      <NGi
        v-for="(icon, index) in icons"
        :key="index"
      >
        <NButton
          :type="value === icon ? 'primary' : 'default'"
          secondary
          class="!w-full"
          @click="handleChoose(icon)"
        >
          <template #icon>
            <Component
              :is="renderIcon(icon)"
              class="text-16px"
            />
          </template>
        </NButton>
      </NGi>
    </NGrid>
  </NPopover>
</template>

<style lang="less" scoped>
.v-icon-select-input {
  cursor: pointer;

  :deep(.n-input__input-el) {
    cursor: pointer !important;
  }
}
</style>
