<template>
  <div class="order">
    <nav-bar>
      <div class="order-list">订单列表</div>
    </nav-bar>
    <div class="tab">
      <tab-control 
        :titles="['全部订单', '近期订单', '待支付']" 
        @tabItemClick="tabClick" 
      />
      <div class="list">
        <order-content-list :order-list="orderList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/nav-bar/nav-bar.vue';
import useOrderStore from '@/stores/modules/order';
import { storeToRefs } from 'pinia';
import OrderContentList from './cpns/order-content-list.vue';
import TabControl from '@/components/tab-control/tab-control.vue';
import { computed, ref, watch } from 'vue';


const orderStore = useOrderStore()
orderStore.fetchOrderListData('all')
const { orderList } = storeToRefs(orderStore)

// 处理type与current的关系,用于请求数据
const sortTypeIndex = {
  'all': 0,
  'recent': 1,
  'pend': 2
}
const typeArr = Object.keys(sortTypeIndex)
const currentIndex = ref(0)
// 监听tab的点击
const tabClick = (index) => {
  currentIndex.value = index
}
// 监听currentIndex的改变，改变就请求对应的数据
watch(currentIndex, (index) => {
  for (let item of typeArr) {
    if (sortTypeIndex[item] === index) {
      orderStore.fetchOrderListData(item)
    }
  }
})






  
</script>

<style lang="less" scoped>
.order {
  .order-list {
    position: relative;
    bottom: 2px;
    text-align: center;
    font-size: 18px;
    color: var(--primary-color);
    font-weight: 600;
    margin-right: 6px;
  }
  .tab {
    .list {
      height: calc(100vh - 108px - 50px);
      overflow-y: auto;
    }
    margin-bottom: 50px;
  }
} 
</style>
