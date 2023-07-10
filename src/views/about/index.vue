<script lang="ts" setup>
export interface schemaItem {
  field: string
  label: string
}

const { pkg, lastBuildTime } = __APP_INFO__
const { dependencies, devDependencies, name, version } = pkg

const schema: schemaItem[] = []
const devSchema: schemaItem[] = []

Object.keys(dependencies).forEach((key) => {
  schema.push({ field: key, label: dependencies[key] })
})

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ field: key, label: devDependencies[key] })
})
</script>

<template>
  <div class="m-16px">
    <NCard
      title="关于"
      :bordered="false"
      class="mt-16px"
      size="small"
      :segmented="{ content: true }"
    >
      <div class="py-8px">
        {{ name }} 是一个基于 Vue3、Vite、Naive UI、TypeScript 的中后台解决方案，它使用了最新的前端技术栈，
        并提炼了典型的业务模型，页面，包括二次封装组件、动态菜单、权限校验、粒子化权限控制等功能，它可以帮助你快速搭建企业级中后台项目，相信不管是从新技术使用还是其他方面，都能帮助到你。
      </div>
    </NCard>
    <NCard
      title="项目信息"
      :bordered="false"
      class="mt-16px"
      size="small"
      :segmented="{ content: true }"
    >
      <NDescriptions
        bordered
        label-placement="left"
        :column="2"
        class="py-2"
      >
        <NDescriptionsItem label="版本">
          <NTag type="primary">
            {{ version }}
          </NTag>
        </NDescriptionsItem>
        <NDescriptionsItem label="最后编译时间">
          <NTag type="primary">
            {{ lastBuildTime }}
          </NTag>
        </NDescriptionsItem>
        <NDescriptionsItem label="Github">
          <NA
            href="https://github.com/Mikasa33/cool-admin-naive"
            class="py-2"
            target="_blank"
          >
            Github 地址
          </NA>
        </NDescriptionsItem>
        <NDescriptionsItem label="预览地址">
          <NA
            href="http://cool.mikasa.cc"
            class="py-2"
            target="_blank"
          >
            预览地址
          </NA>
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>

    <n-card
      :bordered="false"
      title="开发环境依赖"
      class="proCard mt-3"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <NDescriptionsItem v-for="item in devSchema" :key="item.field" :label="item.field">
          {{ item.label }}
        </NDescriptionsItem>
      </n-descriptions>
    </n-card>

    <n-card
      :bordered="false"
      title="生产环境依赖"
      class="proCard mt-3"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <NDescriptionsItem v-for="item in schema" :key="item.field" :label="item.field">
          {{ item.label }}
        </NDescriptionsItem>
      </n-descriptions>
    </n-card>
  </div>
</template>

<style lang="less" scoped></style>
