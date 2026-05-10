<script setup>
import { computed, ref } from 'vue'

const modes = [
  { key: 'heat', label: '热力' },
  { key: 'alert', label: '预警' },
  { key: 'score', label: '评分' },
]

const stores = [
  { id: 'A-01', name: '星禾咖啡', type: '餐饮', x: 8, y: 12, w: 25, h: 22, flow: 1840, conversion: 18.4, dwell: 23, score: 82, alert: '稳定', level: 'good' },
  { id: 'A-02', name: '潮物研究所', type: '零售', x: 38, y: 12, w: 30, h: 22, flow: 2260, conversion: 9.6, dwell: 11, score: 58, alert: '高客流低转化', level: 'warn' },
  { id: 'A-03', name: '亲子工坊', type: '亲子', x: 72, y: 12, w: 20, h: 22, flow: 980, conversion: 22.7, dwell: 35, score: 88, alert: '稳定', level: 'good' },
  { id: 'B-01', name: '城市书房', type: '文化', x: 8, y: 48, w: 28, h: 30, flow: 760, conversion: 15.2, dwell: 42, score: 73, alert: '停留高转化中', level: 'normal' },
  { id: 'B-02', name: '轻食集', type: '餐饮', x: 42, y: 48, w: 24, h: 30, flow: 2050, conversion: 7.8, dwell: 16, score: 49, alert: 'D 级店铺', level: 'danger' },
  { id: 'B-03', name: '玩具岛', type: '亲子', x: 72, y: 48, w: 20, h: 30, flow: 1120, conversion: 20.8, dwell: 31, score: 79, alert: '稳定', level: 'good' },
]

const floorStats = {
  F1: { flow: 9010, inside: 1240, alerts: 1, hot: '中庭入口' },
  F2: { flow: 7420, inside: 980, alerts: 2, hot: '餐饮连廊' },
  F3: { flow: 6180, inside: 840, alerts: 1, hot: '亲子区域' },
}

const selectedFloor = ref('F2')
const mode = ref('heat')
const selectedStoreId = ref('B-02')
const hoveredStoreId = ref('')

const selectedStore = computed(() => stores.find((store) => store.id === selectedStoreId.value) || stores[0])
const hoveredStore = computed(() => stores.find((store) => store.id === hoveredStoreId.value))
const floor = computed(() => floorStats[selectedFloor.value])

const insight = computed(() => {
  const store = selectedStore.value
  if (store.level === 'danger') return '建议优先复核门前客流与进店线段，检查陈列、入口动线和活动承接。'
  if (store.level === 'warn') return '曝光充足但进店不足，建议查看门头吸引力和同业态竞争位置。'
  if (store.score >= 82) return '当前表现较好，可作为同业态标杆观察停留和转化策略。'
  return '表现稳定，适合继续跟踪趋势变化。'
})

function storeClass(store) {
  return [
    'demo-store',
    `level-${store.level}`,
    mode.value === 'score' ? 'score-mode' : '',
    mode.value === 'alert' && store.level !== 'good' ? 'alert-mode' : '',
    selectedStoreId.value === store.id ? 'selected' : '',
    hoveredStoreId.value === store.id ? 'hovered' : '',
  ]
}
</script>

<template>
  <div class="scenario-demo">
    <div class="demo-toolbar">
      <div class="floor-switch">
        <button
          v-for="floorName in Object.keys(floorStats)"
          :key="floorName"
          :class="{ active: selectedFloor === floorName }"
          type="button"
          @click="selectedFloor = floorName"
        >
          {{ floorName }}
        </button>
      </div>
      <div class="mode-switch">
        <button
          v-for="item in modes"
          :key="item.key"
          :class="{ active: mode === item.key }"
          type="button"
          @click="mode = item.key"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <div class="demo-main">
      <div class="demo-map" :class="`mode-${mode}`">
        <div class="map-label">{{ selectedFloor }} · {{ floor.hot }}</div>
        <div class="mall-corridor horizontal"></div>
        <div class="mall-corridor vertical"></div>
        <div class="people-flow flow-a"></div>
        <div class="people-flow flow-b"></div>
        <button
          v-for="store in stores"
          :key="store.id"
          type="button"
          :class="storeClass(store)"
          :style="{ left: `${store.x}%`, top: `${store.y}%`, width: `${store.w}%`, height: `${store.h}%` }"
          @click="selectedStoreId = store.id"
          @mouseenter="hoveredStoreId = store.id"
          @mouseleave="hoveredStoreId = ''"
        >
          <span>{{ store.name }}</span>
          <small>{{ mode === 'score' ? `${store.score}` : store.type }}</small>
        </button>
        <div class="heat-spot heat-main"></div>
        <div class="heat-spot heat-side"></div>
      </div>

      <div class="demo-panel">
        <p class="panel-kicker">Interactive Scenario</p>
        <h3>{{ selectedStore.name }}</h3>
        <p class="store-subtitle">{{ selectedStore.type }} · {{ selectedStore.alert }}</p>
        <div class="stat-grid">
          <div><b>{{ floor.flow.toLocaleString() }}</b><span>楼层客流</span></div>
          <div><b>{{ floor.inside.toLocaleString() }}</b><span>场内人数</span></div>
          <div><b>{{ floor.alerts }}</b><span>楼层预警</span></div>
          <div><b>{{ selectedStore.score }}</b><span>店铺评分</span></div>
        </div>
        <div class="metric-lines">
          <label>
            <span>进店转化率</span><b>{{ selectedStore.conversion }}%</b>
            <i :style="{ width: `${Math.min(selectedStore.conversion * 3, 100)}%` }"></i>
          </label>
          <label>
            <span>平均停留</span><b>{{ selectedStore.dwell }} min</b>
            <i :style="{ width: `${Math.min(selectedStore.dwell * 2, 100)}%` }"></i>
          </label>
          <label>
            <span>今日曝光</span><b>{{ selectedStore.flow.toLocaleString() }}</b>
            <i :style="{ width: `${Math.min(selectedStore.flow / 25, 100)}%` }"></i>
          </label>
        </div>
        <div class="insight-box">
          <b>系统解释</b>
          <span>{{ insight }}</span>
        </div>
        <div v-if="hoveredStore" class="hover-tip">
          正在查看：{{ hoveredStore.name }} · 评分 {{ hoveredStore.score }}
        </div>
      </div>
    </div>
  </div>
</template>

