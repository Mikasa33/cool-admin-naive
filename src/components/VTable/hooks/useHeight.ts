export function useHeight(elRef: any) {
  const { height: winHeight } = useWindowSize()

  const height = ref<number>(0)

  function setTableHeight() {
    const el = elRef.value.$el
    const headEl = el.querySelector('.n-data-table-thead')
    const { top } = useElementBounding(headEl)
    const bottomIncludeBody = unref(winHeight) - unref(top)
    const paddingH = 24
    height.value = bottomIncludeBody - (paddingH + 4)
  }

  // watch(
  //   [width, winHeight],
  //   async () => {
  //     await nextTick()
  //     setTableHeight()
  //   },
  //   {
  //     immediate: true,
  //   },
  // )

  const debouncedFn = useDebounceFn(() => {
    setTableHeight()
  }, 100)

  window.addEventListener('resize', debouncedFn)

  onMounted(() => {
    debouncedFn()
  })

  return {
    height,
  }
}
