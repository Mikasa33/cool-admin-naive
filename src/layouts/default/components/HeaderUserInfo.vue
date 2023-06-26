<script setup lang="ts">
import HeaderItem from './HeaderItem.vue'

const dialog = useDialog()
const userStore = useUserStore()

const options = [
  {
    key: 'user-setting',
    label: '个人设置',
    icon: () => h('div', { class: 'i-icon-park-outline-setting-one' }),
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: () => h('div', { class: 'i-icon-park-outline-logout' }),
  },
]

function handleSelect(val: any) {
  switch (val) {
    case 'user-setting':
      break
    case 'logout':
      dialog.warning({
        autoFocus: false,
        title: '提示',
        content: '是否确认退出登录？',
        negativeText: '取 消',
        positiveText: '确 认',
        onPositiveClick: () => {
          userStore.logout()
        },
      })
      break
  }
}
</script>

<template>
  <NDropdown
    :options="options"
    trigger="hover"
    @select="handleSelect"
  >
    <HeaderItem>
      <NAvatar
        src="/logo.png"
        round
        :size="36"
      />
      <span class="ml-8px">用户昵称</span>
    </HeaderItem>
  </NDropdown>
</template>
