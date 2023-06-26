<script lang="ts" setup>
const emit = defineEmits(['setting'])

const density = ref('medium')
const densityOptions = [
  {
    key: 'small',
    label: '紧凑',
  },
  {
    key: 'medium',
    label: '默认',
  },
  {
    key: 'large',
    label: '宽松',
  },
]

function handleSelectDensity(key: 'string') {
  density.value = key
  emit('setting', unref(density))
}
</script>

<template>
  <NDropdown
    :value="density"
    :options="densityOptions"
    trigger="click"
    @select="handleSelectDensity"
  >
    <NTooltip trigger="hover">
      <template #trigger>
        <div class="i-icon-park-outline-auto-height-one ml-4px cursor-pointer text-16px transition-base hover:text-[#18a058]" />
      </template>
      密度
    </NTooltip>
  </NDropdown>
</template>
