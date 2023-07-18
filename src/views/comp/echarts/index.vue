<script setup lang="ts">
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, GaugeChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components'

use([
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
])

const themeStore = useThemeStore()
const theme = computed(() => themeStore.isDark ? 'dark' : '')

const option1 = ref({
  backgroundColor: 'transparent',
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    },
  ],
})

const option2 = ref({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top',
      },
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
})

const option3 = ref({
  backgroundColor: 'transparent',
  title: {
    text: 'Traffic Sources',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})

const option4 = ref({
  backgroundColor: 'transparent',
  series: [
    {
      type: 'gauge',
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d'],
          ],
        },
      },
      pointer: {
        itemStyle: {
          color: 'auto',
        },
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2,
        },
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4,
        },
      },
      axisLabel: {
        color: 'inherit',
        distance: 40,
        fontSize: 14,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} km/h',
        color: 'inherit',
        fontSize: 14,
      },
      data: [
        {
          value: 70,
        },
      ],
    },
  ],
})
</script>

<template>
  <div class="m-16px">
    <NCard
      title="ECharts"
      :bordered="false"
      size="small"
    >
      <div>在 Vue 中使用 ECharts。</div>
    </NCard>

    <NCard
      :bordered="false"
      size="small"
      class="mt-16px"
    >
      <NGrid
        item-responsive
        responsive="screen"
        :x-gap="16"
        :y-gap="16"
      >
        <NGi span="xs:24 m:12">
          <NAlert
            :show-icon="false"
            title="折线图"
            type="success"
          >
            <VChart
              :option="option1"
              :theme="theme"
              autoresize
              class="h-300px"
            />
          </NAlert>
        </NGi>
        <NGi span="xs:24 m:12">
          <NAlert
            :show-icon="false"
            title="统计图"
            type="success"
          >
            <VChart
              :option="option2"
              :theme="theme"
              autoresize
              class="h-300px"
            />
          </NAlert>
        </NGi>
        <NGi span="xs:24 m:12">
          <NAlert
            :show-icon="false"
            title="饼状图"
            type="success"
          >
            <VChart
              :option="option3"
              :theme="theme"
              autoresize
              class="h-300px"
            />
          </NAlert>
        </NGi>
        <NGi span="xs:24 m:12">
          <NAlert
            :show-icon="false"
            title="仪表盘"
            type="success"
          >
            <VChart
              :option="option4"
              :theme="theme"
              autoresize
              class="h-300px"
            />
          </NAlert>
        </NGi>
      </NGrid>
    </NCard>
  </div>
</template>
