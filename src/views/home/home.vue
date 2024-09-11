<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-category />
    <home-content />
    <div @click="searchClick">
      <search-bar v-if="isShowSearchBar" />
    </div>
  </div>
</template>

<script>
export default { name: 'home' }
</script>

<script setup>
import { computed, onActivated, ref, watch } from "vue";
import useHomeStore from "@/stores/modules/home";
import HomeCategory from "./cpns/home-category.vue";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeContent from './cpns/home-content.vue'
import SearchBar from "@/components/search-bar/search-bar.vue";

import useScroll from "@/hooks/useScroll";
import router from "@/router";

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

// 监听window窗口的滚动
// 方式一
// useScroll(() => {
//   homeStore.fetchHouseListData()
// })
// 方式二
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseListData().then(() => {
      // 这里是确保拿到数据后再改变isReachBottom的值
      isReachBottom.value = false
    })
  }
})

// 控制搜索框的显示
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})

// 跳转会home时，保留原来位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

// 搜索页面的跳转
const searchClick = () => {
  router.push('/search')
}
  
</script> 

<style lang="less" scoped>
.home {
 height: 100vh;
 overflow-y: auto;
// 设置高度为100vh就是视口高度，
// box-sizing: border-box;这个属性可以将margin/padding包含进去，要不会把margin/padding高度撑大
 box-sizing: border-box;
 margin-bottom: 60px;
}
.banner {
  img {
    width: 100%;
  }
} 


</style>
