<template>
  <div class="city not-tabbar">
    <div class="top">
      <!-- 搜索框 -->
      <van-search 
        v-model="searchValue" 
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- <city-group :group-data="currentGroup"/> -->
       <template v-for="(value, key, index) in allCities" :key="key">
        <city-group v-show="tabActive === key" :group-data="value"/> 
       </template>
    </div>
  </div>  
</template>

<script setup>
import { computed, ref } from 'vue';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import CityGroup from './cpns/city-group.vue'

// 搜索框功能
const router = useRouter()
const searchValue = ref("")
const cancelClick = () => {
  router.back()
}
// tab切换功能
const tabActive = ref(0)

// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 获取选中后的标签数据
// 1.获取正确的key：将tabs中tabActive正确绑定，在tab使用:name="key"
// 2.根据key从allcities中获取对应的数据
// 3.包裹computed让得到的数据变成响应式
// const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>

.city {

  .top {
    position: relative;
    z-index: 9;
  }

  // 布局滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto; 
  }
}
</style>
