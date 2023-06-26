<script setup lang="ts">
import type { ButtonProps, ModalProps } from 'naive-ui'

interface Props {
  modalProps?: ModalProps
  title?: string
  width?: number | string
  showAction?: boolean
  showConfirmAction?: boolean
  showCancelAction?: boolean
  actions?: any[]
  confirmLabel?: string
  confirmType?: ButtonProps['type']
  confirmLoading?: boolean
  cancelLabel?: string
  cancelType?: string
  cancelLoading?: boolean
  isCrud?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '800px',
  showAction: true,
  showConfirmAction: true,
  showCancelAction: true,
  actions: () => [
    {
      label: '取消',
      handle: 'cancel',
    },
    {
      label: '确认',
      type: 'primary',
      handle: 'confirm',
    },
  ],
  confirmLabel: '确认',
  confirmType: 'primary',
  cancelLabel: '取消',
})

const emit = defineEmits(['clickAction', 'confirm', 'cancel'])

const modalRef = ref()
const modalContainerRef = computed(() => modalRef.value?.containerRef)

const [show, toggleShow] = useToggle()
const [isFullscreen, toggleFullscreen] = useToggle()

const modalClass = computed(() => unref(isFullscreen) ? null : '!mt-10vh')
const modalStyle = computed(() => {
  return {
    width: unref(isFullscreen) ? '100vw' : props.width,
    height: unref(isFullscreen) ? '100vh' : 'auto',
  }
})

const modalHeaderHeight = computed(() => unref(modalContainerRef)?.querySelector('.n-card-header')?.offsetHeight || 0)
const modalActionHeight = computed(() => unref(modalContainerRef)?.querySelector('.n-card__action')?.offsetHeight || 0)
const scrollBarMaxHeight = computed(() => `calc(${unref(isFullscreen) ? '100vh' : '80vh'} - ${unref(modalHeaderHeight)}px${props.showAction ? ` - ${unref(modalActionHeight)}px` : null})`)

const mergeActions = computed(() => {
  const actions = props.actions
  actions.forEach((action: any) => {
    if (action.handle === 'confirm') {
      action.label = props.isCrud ? '保存' : props.confirmLabel
      action.type = props.confirmType
      action.loading = props.confirmLoading
    }
    else if (action.handle === 'cancel') {
      action.label = props.cancelLabel
      action.type = props.cancelType
      action.loading = props.cancelLoading
    }
  })
  return actions
})

async function open() {
  toggleShow(true)
  await nextTick()
}

function close() {
  toggleShow(false)
}

function getActionLabel({ label }: any) {
  return label?.length === 2 ? label.split('').join(' ') : label
}

function handleUpdateShow(val: boolean) {
  if (!val)
    toggleShow(val)

  emit('cancel')
}

function handleClickAction(action: any) {
  if (action.handle === 'cancel')
    handleUpdateShow(false)

  emit(action.handle || 'clickAction', action)
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <NModal
    ref="modalRef"
    :show="show"
    preset="card"
    :auto-focus="false"
    v-bind="modalProps"
    :segmented="{
      content: true,
      action: true,
    }"
    :content-style="{
      padding: '0',
    }"
    :class="modalClass"
    :style="modalStyle"
    @update:show="handleUpdateShow"
  >
    <template #header>
      <div class="w-full">
        {{ title }}
      </div>
    </template>
    <template #header-extra>
      <div
        class="n-base-close n-base-close--absolute n-card-header__close !mr-8px"
        @click="toggleFullscreen()"
      >
        <div :class="isFullscreen ? 'i-icon-park-outline-off-screen' : 'i-icon-park-outline-full-screen'" />
      </div>
    </template>
    <NScrollbar :style="{ padding: 0, maxHeight: scrollBarMaxHeight }">
      <div class="px-24px py-20px">
        <slot />
      </div>
    </NScrollbar>
    <template v-if="showAction" #action>
      <NSpace justify="end">
        <template v-for="(action, index) in mergeActions">
          <NButton
            v-if="showConfirmAction && action.handle === 'confirm' || showCancelAction && action.handle === 'cancel'"
            :key="index"
            v-bind="action"
            @click="() => handleClickAction(action)"
          >
            {{ getActionLabel(action) }}
          </NButton>
        </template>
      </NSpace>
    </template>
  </NModal>
</template>
