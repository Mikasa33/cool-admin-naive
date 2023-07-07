<script setup lang="ts">
import icons from '../VIcon/icons'
import { renderIcon } from '@/utils/icon'

defineProps<{
  value?: string
}>()

const emit = defineEmits(['update:value'])

const inputRef = ref()
const { width } = useElementSize(inputRef)
const popoverWidth = computed(() => `${unref(width)}px`)
const [show, toggleShow] = useToggle()
const keyword = ref('')
const filterIcons = computed(() => icons.filter((item: any) => item.includes(unref(keyword))))
const pagination: any = reactive({
  page: 1,
  total: computed(() => Math.ceil(unref(filterIcons).length / 20)),
  data: computed(() => unref(filterIcons).slice((pagination.page - 1) * 20, pagination.page * 20)),
})

watch(
  keyword,
  () => {
    pagination.page = 1
  },
)

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

    <div class="my-8px">
      <NInput
        v-model:value="keyword"
        placeholder="搜索图标"
        clearable
        class="mb-8px"
      />
      <NScrollbar :style="{ height: '202px' }">
        <div v-show="filterIcons.length">
          <NGrid
            :x-gap="8"
            :y-gap="8"
            cols="2 400:4 640:8 1024:12 1280:12 1536:16 1920:24"
          >
            <NGi
              v-for="(icon, index) in pagination.data"
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
        </div>
        <div
          v-show="!filterIcons.length"
          class="h-202px flex-center"
        >
          <NEmpty />
        </div>
      </NScrollbar>
      <NPagination
        v-model:page="pagination.page"
        :page-count="pagination.total"
        :page-size="20"
        simple
        class="flex justify-end mt-8px"
      />
    </div>
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
