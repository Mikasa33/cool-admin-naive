export function useDict(fn: any) {
  const dicts = ref({})

  onMounted(async () => {
    const result = await fn()
    dicts.value = result
  })

  return {
    dicts,
  }
}
