<template>
  <div class="top-box">
    <div class="header">
      <search-bar v-if="isShowSearchBar" :is-show-icon-left="true" />
      <div class="menu">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import searchBar from '@/components/search-bar/search-bar.vue';

const isShowSearchBar = ref(true)

 const value1 = ref(0);
    const value2 = ref('a');
    const option1 = [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ];
    const option2 = [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ];

</script>

<style lang="less" scoped>
.top-box {
  .header {
    .menu {
      position: fixed;
      top: 65px;
      left: 0;
      right: 0;
    }
  }
}
</style>
