<template>
  <div class="collection">
    <nav-bar>
      <div class="container">
        <div class="favor" @click="containerClick(0)">我的收藏</div>
        <div class="history" @click="containerClick(1)">浏览历史</div>
      </div>
    </nav-bar>
    <div class="tab">
      <tab-control :titles="['房屋', '房东']" />
      <div class="list">
        <content :content-data="listData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/nav-bar/nav-bar.vue';
import Content from '@/components/content/content.vue'
import TabControl from '@/components/tab-control/tab-control.vue';
import useFavorStore from '@/stores/modules/favor';
import { storeToRefs } from 'pinia';

const props = defineProps({
  listData: {
    type: Object,
    default: () => ({})
  }
})
const favorStore = useFavorStore()
const { currentIndex } = storeToRefs(favorStore)

const containerClick = (index) => {
  currentIndex.value = index
}

</script>

<style lang="less" scoped>
.collection {
  .container {
    display: flex;
    justify-content: center;
    .favor {
      padding: 6px 10px;
      border-radius: 3px; 
      border: 1px solid var(--primary-color);
      background-color: var(--primary-color);
      color: #fff;
    }
    .history {
      padding: 6px 10px;
      border-radius: 3px;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
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
