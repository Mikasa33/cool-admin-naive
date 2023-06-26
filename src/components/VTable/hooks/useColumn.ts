import { isUndefined } from 'lodash-es'
import type { Props } from '../VTable.vue'

export function useColumn(props: Props) {
  const defaultColumns = ref([])

  const mergeColumns = computed(() => {
    const columns: any[] = [...unref(defaultColumns)]

    if (props.actionColumn?.render) {
      columns.push({
        key: 'action',
        title: '操作',
        align: 'center',
        fixed: 'right',
        ...props.actionColumn,
      })
    }

    return columns
  })
  const filterColumns = computed(() => unref(mergeColumns).filter((column: any) => isUndefined(column.show) ? true : column.show))

  function initColumns(): any {
    return props.columns?.map((item: any) => ({ ...item, show: item.show ?? true }))
  }

  function handleResetColumns() {
    defaultColumns.value = initColumns()
  }

  watch(
    () => props.columns,
    () => {
      defaultColumns.value = initColumns()
    },
    {
      immediate: true,
    },
  )

  return {
    defaultColumns,
    mergeColumns,
    filterColumns,
    handleResetColumns,
  }
}
