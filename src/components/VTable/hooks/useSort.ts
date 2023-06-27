export function useSort(columns: any, reload: Function) {
  const sort = ref({
    order: '',
    sort: '',
  })

  function getOrder(order: 'ascend' | 'descend' | '' | undefined | null) {
    return order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : ''
  }

  function handleUpdateSorter({ columnKey, order }: any) {
    const column: any = unref(columns).find((item: any) => item.key === columnKey)
    if (column) {
      column.sortOrder = order
      sort.value = {
        order: column.key,
        sort: getOrder(order),
      }
      reload()
    }
  }

  function initSort() {
    for (let i = 0; i < unref(columns).length; i++) {
      const { key, sorter, sortOrder } = unref(columns)[i]
      if (sorter) {
        sort.value = {
          order: key,
          sort: getOrder(sortOrder),
        }
        return
      }
    }
  }

  watch(
    columns,
    (val: any) => {
      initSort()
    },
    {
      immediate: true,
    },
  )

  return {
    sort,
    handleUpdateSorter,
  }
}
