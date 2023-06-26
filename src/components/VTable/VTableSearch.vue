<script lang="ts" setup>
import type { FormItemGiProps } from 'naive-ui'

const props = defineProps<{
  searchGiProps?: FormItemGiProps
  searchSchemas?: Array<any>
  loading?: boolean
}>()

const emit = defineEmits(['search'])

const span = 'xs:24 s:12 m:6'

const searchRef = ref()
const mergeSearchSchemas = computed(() => {
  const searchSchemas = props.searchSchemas
  const searchSchemasLength = searchSchemas?.length || 0
  return [
    ...(searchSchemas?.map((item: any) => ({
      ...item,
      giProps: {
        span: props.searchGiProps?.span || span,
      },
    })) || []),
    {
      slot: 'customAction',
      itemProps: {
        showLabel: false,
      },
      giProps: {
        span,
        offset: `s:${!(searchSchemasLength % 2) ? 12 : 0} m:${!(searchSchemasLength % 4) ? 18 : !(searchSchemasLength % 3) ? 0 : !(searchSchemasLength % 2) ? 6 : 12}`,
        ...props.searchGiProps,
      },
    },
  ]
})

function handleSearch() {
  emit('search', searchRef.value.getFieldsValue())
}

function handleReset() {
  searchRef.value.reset()
  handleSearch()
}

function getFieldsValue() {
  searchRef.value.getFieldsValue()
}

onMounted(() => {
  unref(searchRef).init(unref(mergeSearchSchemas))
})

defineExpose({
  getFieldsValue,
})
</script>

<template>
  <NCard :bordered="false">
    <VForm
      ref="searchRef"
      :gi-props="{
        yGap: 16,
      }"
      :form-props="{
        showFeedback: false,
        labelWidth: 'auto',
      }"
    >
      <template #customAction>
        <NSpace
          align="center"
          justify="end"
          class="w-full"
        >
          <NButton
            type="primary"
            :loading="loading"
            @click="handleSearch"
          >
            查 询
          </NButton>
          <NButton @click="handleReset">
            重 置
          </NButton>
          <!-- <NButton v-if="showExpandButton" text>
            展开
            <div class="i-icon-park-outline-down" />
          </NButton> -->
        </NSpace>
      </template>
    </VForm>
  </NCard>
</template>
