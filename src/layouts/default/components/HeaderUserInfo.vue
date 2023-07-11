<script setup lang="ts">
const router = useRouter()
const dialog = useDialog()
const userStore = useUserStore()
const userInfo = computed(() => userStore.info)

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
      router.push('/setting/user')
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
  <div class="text-0">
    <NDropdown
      :options="options"
      trigger="hover"
      @select="handleSelect"
    >
      <NButton
        tertiary
        circle
        size="large"
      >
        <NAvatar
          :src="userInfo?.headImg"
          round
          object-fit="cover"
          :size="40"
        />
      </NButton>
    </NDropdown>
  </div>
</template>
