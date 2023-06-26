import type { Props } from '../VTable.vue'

export function useTableTools(props: Props) {
  const striped = ref(props.striped)
  const size = ref(props.size)

  function handleStriped(val: boolean) {
    striped.value = val
  }

  function handleDensity(val: 'medium' | 'small' | 'large') {
    size.value = val
  }

  return {
    striped,
    size,
    handleStriped,
    handleDensity,
  }
}
