<script setup lang="ts">
import Header from './components/Header.vue'
import Sider from './components/Sider.vue'

const isDark = useDark()

const headerHeight = 64
</script>

<template>
  <NLayout has-sider position="absolute">
    <Sider :header-height="headerHeight" />
    <NLayout>
      <Header :height="headerHeight" />
      <NLayout
        :native-scrollbar="false"
        :style="{
          marginTop: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        }"
      >
        <NLayoutContent :content-style="{ minHeight: `calc(100vh - ${headerHeight}px)`, backgroundColor: isDark ? '#101014' : '#f0f2f5' }">
          <RouterView />
        </NLayoutContent>
      </NLayout>
    </NLayout>
  </NLayout>
</template>
