<template>
  <div class="search not-tabbar">
    <div class="top">
     <search-top-box />
    </div>
    <div class="content">
      <content :content-data="contentData" />
    </div>

  </div>
</template>

<script setup>

import useSearchStore from '@/stores/modules/search';
import Content from '@/components/content/content.vue';
import SearchTopBox from './cpns/search-top-box.vue';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';



// 发送网络请求，获取search信息
const searchStore = useSearchStore()
searchStore.fetchSearchTopData()
searchStore.fetchSearchResultData()
const { searchResults } = storeToRefs(searchStore)

const contentData = computed(() => {
  return searchResults.value.data
})
// if (searchResults) {
//   console.log(searchResults.value.data); 
//   // contentData.value = searchResults.value.data.items
// }



</script>

<style lang="less" scoped>
.search {
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
  .top {
  }  
  .content {
    margin-top: 113px;
  }
}
</style>
