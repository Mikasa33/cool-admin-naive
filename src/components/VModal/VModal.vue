<script setup lang="ts">
import { uniqueId } from 'lodash-es'
import type { ModalProps } from './types'
import startDrag from '@/utils/drag'

const props = withDefaults(defineProps<ModalProps>(), {
  width: '800px',
  loading: false,
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
  drag: true,
  fullscreen: true,
})

const emit = defineEmits<{
  (evt: 'clickAction', value: any): void
  (evt: 'confirm', value: any): void
  (evt: 'cancel'): void
}>()

const modalRef = ref()
const modalContainerRef = computed(() => unref(modalRef)?.containerRef)

const vModalId = uniqueId('v-modal-')
const vModalBarId = uniqueId('v-modal-bar-')

const [show, toggleShow] = useToggle()
const [isFullscreen, toggleFullscreen] = useToggle()

watch(
  isFullscreen,
  (val: boolean) => {
    if (!val || !props.drag)
      return

    const oBox: any = document.getElementById(vModalId)
    if (oBox.style) {
      oBox.style.top = 0
      oBox.style.left = 0
    }
  },
)

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

function handleAfterEnter() {
  if (!props.drag)
    return

  const oBox = document.getElementById(vModalId)
  const oBar = document.getElementById(vModalBarId)
  if (!oBox || !oBar) {
    console.warn('not found modal')
    return
  }
  startDrag(oBar, { target: oBox })
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
    :id="vModalId"
    v-bind="$attrs"
    ref="modalRef"
    :auto-focus="false"
    :show="show"
    preset="card"
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
    @after-enter="handleAfterEnter"
  >
    <template #header>
      <div
        :id="vModalBarId"
        :class="{ 'cursor-move': drag }"
        class="w-full"
      >
        {{ title }}
      </div>
    </template>
    <template #header-extra>
      <div
        v-if="fullscreen"
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
    <template v-if="showAction && !loading" #action>
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
