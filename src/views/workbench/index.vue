<script setup lang="ts">
const userStore = useUserStore()
const userInfo = computed(() => userStore.info)

const projects = [
  {
    icon: 'i-logos-github-icon',
    title: 'Github',
    description: '不要等待机会，而要创造机会。',
    team: '开源组',
    datetime: '2021-04-01',
  },
  {
    icon: 'i-logos-vue',
    title: 'Vue',
    description: '现在的你决定将来的你。',
    team: '算法组',
    datetime: '2021-04-01',
  },
  {
    icon: 'i-logos-html-5',
    title: 'Html5',
    description: '没有什么才能比努力更重要。',
    team: '上班摸鱼',
    datetime: '2021-04-01',
  },
  {
    icon: 'i-logos-angular-icon',
    title: 'Angular',
    description: '热情和欲望可以突破一切难关。',
    team: 'UI',
    datetime: '2021-04-01',
  },
  {
    icon: 'i-logos-react',
    title: 'React',
    description: '健康的身体是实现目标的基石。',
    team: '技术牛',
    datetime: '2021-04-01',
  },
  {
    icon: 'i-logos-javascript',
    title: 'Js',
    description: '路是走出来的，而不是空想出来的。',
    team: '架构组',
    datetime: '2021-04-01',
  },
]

const navigations = [
  {
    icon: 'i-icon-park-outline-workbench',
    color: 'rgb(63, 178, 127)',
    title: '工作台',
  },
  {
    icon: 'i-icon-park-outline-user',
    color: 'rgb(0, 216, 255)',
    title: '用户管理',
  },
  {
    icon: 'i-icon-park-outline-hamburger-button',
    color: 'rgb(225, 133, 37)',
    title: '菜单管理',
  },
  {
    icon: 'i-icon-park-outline-peoples',
    color: 'rgb(25, 162, 241)',
    title: '角色管理',
  },
  {
    icon: 'i-icon-park-outline-bookmark-one',
    color: 'rgb(114, 56, 209)',
    title: '字典管理',
  },
  {
    icon: 'i-icon-park-outline-setting-config',
    color: 'rgba(77, 175, 27)',
    title: '参数配置',
  },
  {
    icon: 'i-icon-park-outline-document-folder',
    color: 'rgb(245, 108, 108)',
    title: '文件管理',
  },
]

const dynamics = [
  {
    icon: 'i-streamline-emojis:boar-1',
    title: 'Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！',
    datetime: '2021-07-04 22:37:16',
  },
  {
    icon: 'i-streamline-emojis:dog-face',
    title: 'Ah Jung 在 开源组 创建了项目 naive-ui-admin？',
    datetime: '2021-07-04 22:37:16',
  },
  {
    icon: 'i-streamline-emojis:bird-1',
    title: '@风清扬，向naive-ui-admin提交了一个bug，抽时间看看吧！',
    datetime: '2021-07-04 22:37:16',
  },
  {
    icon: 'i-streamline-emojis:bug',
    title: '技术部那几位童鞋，再次警告，不要摸鱼，不要摸鱼，不要摸鱼啦！',
    datetime: '2021-07-04 22:37:16',
  },
  {
    icon: 'i-streamline-emojis:chicken',
    title: '上班不摸鱼，和咸鱼有什么区别（这话真不是我说的哈）！',
    datetime: '2021-07-04 22:37:16',
  },
]
</script>

<template>
  <div class="m-16px">
    <NCard :bordered="false">
      <div class="flex justify-between">
        <div class="flex items-center">
          <NAvatar
            :src="userInfo.headImg"
            round
            object-fit="cover"
            :size="72"
          />
          <div class="flex flex-col ml-20px">
            <NH3 class="!mb-0">
              早安，{{ userInfo.nickName }}，开始您一天的工作吧！
            </NH3>
            <NText :depth="3" class="mt-4px">
              今日晴，20℃ - 32℃！
            </NText>
          </div>
        </div>
        <NSpace
          justify="start"
          align="center"
          :wrap="false"
          :size="36"
        >
          <NStatistic label="待办" value="2 / 10" />
          <NStatistic label="项目" :value="8" />
          <NStatistic label="团队" :value="300" />
        </NSpace>
      </div>
    </NCard>

    <NGrid
      :x-gap="16"
      :y-gap="16"
    >
      <NGi :span="16">
        <NCard
          title="项目"
          size="small"
          :bordered="false"
          :segmented="{
            content: true,
            action: true,
          }"
          class="mt-16px"
        >
          <NGrid
            :x-gap="8"
            :y-gap="8"
          >
            <NGi
              v-for="(item, index) in projects"
              :key="index"
              :span="8"
            >
              <NCard
                hoverable
                size="small"
                class="cursor-pointer"
              >
                <template #header>
                  <div class="flex items-center">
                    <div
                      :class="item.icon"
                      class="text-24px"
                    />
                    <NH3 class="!m-0 !ml-16px">
                      {{ item.title }}
                    </NH3>
                  </div>
                </template>
                <NText :depth="3">
                  {{ item.description }}
                </NText>
                <template #footer>
                  <div class="justify-between flex-center">
                    <NText :depth="3">
                      {{ item.team }}
                    </NText>
                    <NText :depth="3">
                      {{ item.datetime }}
                    </NText>
                  </div>
                </template>
              </NCard>
            </NGi>
          </NGrid>
        </NCard>
        <NCard
          title="动态"
          size="small"
          :bordered="false"
          :segmented="{
            content: true,
            action: true,
          }"
          :content-style="{ padding: '0 16px' }"
          class="mt-16px"
        >
          <template #header-extra>
            <NButton
              type="primary"
              text
            >
              更多
            </NButton>
          </template>
          <NList clickable>
            <NListItem
              v-for="(item, index) in dynamics"
              :key="index"
            >
              <NThing class="group">
                <template #avatar>
                  <div
                    :class="item.icon"
                    class="text-28px"
                  />
                </template>
                <template #header>
                  <NH4 class="!m-0 group-hover:text-#18a058 dark:group-hover:text-#63e2b7">
                    {{ item.title }}
                  </NH4>
                </template>
                <template #description>
                  <NText :depth="3">
                    {{ item.datetime }}
                  </NText>
                </template>
              </NThing>
            </NListItem>
          </NList>
        </NCard>
      </NGi>
      <NGi :span="8">
        <NCard
          title="快捷导航"
          size="small"
          :bordered="false"
          :segmented="{
            content: true,
            action: true,
          }"
          class="mt-16px"
        >
          <NGrid
            :x-gap="8"
            :y-gap="8"
          >
            <NGi
              v-for="(item, index) in navigations"
              :key="index"
              :span="8"
            >
              <NCard
                hoverable
                size="small"
                class="cursor-pointer"
              >
                <div class="flex-col my-8px flex-center">
                  <div
                    :class="item.icon"
                    class="text-18px"
                    :style="{ color: item.color }"
                  />
                  <div class="mt-8px">
                    {{ item.title }}
                  </div>
                </div>
              </NCard>
            </NGi>
          </NGrid>
        </NCard>
        <NCard
          title="创意"
          size="small"
          :bordered="false"
          class="mt-16px"
        >
          <img src="/business.svg">
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>
