<script setup lang="ts">
const BAI_DU_MAP_URL = 'https://api.map.baidu.com/getscript?v=3.0&ak=y2GA6iy9Bx6MVGFxxKC1x2bGsRUtFw6Z&services=&t=20210201100830&s=1'

const wrapRef = ref<HTMLDivElement | null>(null)
const { toPromise } = useScript({ src: BAI_DU_MAP_URL })

async function initMap() {
  await toPromise()
  await nextTick()
  const wrapEl = unref(wrapRef)
  if (!wrapEl)
    return
  const BMap = (window as any).BMap
  const map = new BMap.Map(wrapEl)
  const point = new BMap.Point(116.404, 39.915)
  map.centerAndZoom(point, 15)
  map.enableScrollWheelZoom(true)
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="m-16px">
    <NCard
      title="地图"
      :bordered="false"
      size="small"
    >
      <div>在 Vue 中使用地图组件。</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NAlert
        :show-icon="false"
        title="百度地图"
        type="success"
      >
        <div ref="wrapRef" class="h-450px w-full" />
      </NAlert>
    </NCard>
  </div>
</template>
