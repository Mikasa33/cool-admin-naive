<script setup lang="ts">
import { renderIcon } from '@/utils/icon'

const options = [
  {
    label: '发送到邮箱',
    key: 'email',
    icon: renderIcon('i-icon-park-outline-mail'),
  },
  {
    label: '发送到手机',
    key: 'mobile',
    icon: renderIcon('i-icon-park-outline-phone'),
  },
  {
    label: '其他',
    key: 'others',
    icon: renderIcon('i-icon-park-outline-more'),
    children: [
      {
        label: 'QQ',
        key: 'qq',
        icon: renderIcon('i-icon-park-outline-tencent-qq'),
      },
      {
        label: '微信',
        key: 'weixin',
        icon: renderIcon('i-icon-park-outline-wechat'),
      },
    ],
  },
]
const showDropdownRef = ref(false)
const message = useMessage()
const xRef = ref(0)
const yRef = ref(0)

function handleSelect(key: any) {
  showDropdownRef.value = false
  message.info(`${key}-这个是你点击的菜单吧？`)
}

function handleContextMenu(e: any) {
  e.preventDefault()
  showDropdownRef.value = false
  nextTick().then(() => {
    showDropdownRef.value = true
    xRef.value = e.clientX
    yRef.value = e.clientY
  })
}

function onClickoutside() {
  message.info('您点击了外部区域，菜单不见了哈！')
  showDropdownRef.value = false
}
</script>

<template>
  <div class="m-16px">
    <NCard
      title="右键菜单"
      :bordered="false"
      size="small"
    >
      右键菜单示例，指定元素右键显示操作菜单
    </NCard>
    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="右键展示菜单"
        type="success"
      >
        <NButton
          type="primary"
          class="!mt-8px"
          @contextmenu="handleContextMenu"
        >
          右键试试
        </NButton>
      </NAlert>
      <NAlert
        :show-icon="false"
        title="头像组件右键展示菜单"
        type="success"
        class="mt-16px"
      >
        <NAvatar
          src="/logo.png"
          :size="80"
          color="#fff"
          class="!mt-8px"
          @contextmenu="handleContextMenu"
        />
      </NAlert>

      <NDropdown
        placement="bottom-start"
        trigger="manual"
        :x="xRef"
        :y="yRef"
        :options="options"
        :show="showDropdownRef"
        :on-clickoutside="onClickoutside"
        @select="handleSelect"
      />
    </NCard>
  </div>
</template>
