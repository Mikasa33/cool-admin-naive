<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { searchSchemas } from './schemas/search'
import { columns } from './schemas/table'
import { log } from '@/apis/system/log'

const dialog = useDialog()
const message = useMessage()

const tableRef = ref()
const searchGiProps = {
  span: 'xs:24 s:12 m:12 l:8',
  offset: 'xs:0 s:0 m:0 l:8',
}

async function load(params: any) {
  return log.page({ ...params })
}

function handleRefresh() {
  unref(tableRef).reload()
}

function handleClear() {
  const d = dialog.warning({
    autoFocus: false,
    title: '提示',
    content: '是否确认清空日志',
    positiveText: '确 认',
    negativeText: '取 消',
    onPositiveClick: async () => {
      d.loading = true
      try {
        await log.clear()
        message.success('清空成功')
        handleRefresh()
      }
      catch (err) {

      }
    },
  })
}

const day = ref(1)

async function handleSaveDay() {
  try {
    await log.setKeep({ value: unref(day) || 1 })
    message.success('修改日志保存天数成功')
  }
  catch (err) {

  }
}

onMounted(async () => {
  const result = await log.getKeep()
  day.value = Number(result || 1)
})
</script>

<template>
  <div class="m-16px">
    <VTable
      ref="tableRef"
      :columns="columns"
      :search-gi-props="searchGiProps"
      :search-schemas="searchSchemas"
      :load="load"
      :scroll-x="1330"
    >
      <template #action>
        <VTableBtn
          type="error"
          @click="handleClear"
        >
          清 空
        </VTableBtn>
        <NForm
          label-placement="left"
          :show-feedback="false"
        >
          <NFormItem label="日志保存天数">
            <NInputNumber
              v-model:value="day"
              placeholder="请输入天数"
              :min="1"
              class="font-normal text-center w-150px"
              @blur="handleSaveDay"
            />
          </NFormItem>
        </NForm>
      </template>
    </VTable>
  </div>
</template>
