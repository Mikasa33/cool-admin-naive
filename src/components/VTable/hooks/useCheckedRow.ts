export function useCheckedRow() {
  const checkedRowKeys = ref<string[] | number[]>([])

  function getCheckedRowKeys() {
    return unref(checkedRowKeys)
  }

  function setCheckedRowKeys(keys: string[] | number[]) {
    checkedRowKeys.value = keys || []
  }

  return {
    checkedRowKeys,
    getCheckedRowKeys,
    setCheckedRowKeys,
  }
}
