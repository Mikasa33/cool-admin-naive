import { isBoolean, merge } from 'lodash-es'

import type { PaginationProps } from 'naive-ui'
import type { Props } from '../VTable.vue'

export function usePagination(props: Props, load: Function) {
  const defaultPagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    pageSizes: [10, 20, 50, 100],
    showQuickJumper: true,
    showSizePicker: true,
    onUpdatePage: (page: number) => {
      defaultPagination.page = page
      load()
    },
    onUpdatePageSize: (pageSize: number) => {
      defaultPagination.page = 1
      defaultPagination.pageSize = pageSize
      load()
    },
  })
  const mergePagination = computed(() => isBoolean(props.pagination) ? props.pagination : merge(defaultPagination, props.pagination))
  const paginationParams = computed(() => ({
    page: (unref(mergePagination) as PaginationProps)?.page,
    size: (unref(mergePagination) as PaginationProps)?.pageSize,
  }))

  return {
    defaultPagination,
    mergePagination,
    paginationParams,
  }
}
