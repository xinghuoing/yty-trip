<template>
  <div class="app">
    <!-- 匹配的组件的name属性 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component" />
      </keep-alive>
    </router-view>

    <!-- 不推荐写法 -->
    <!-- <keep-alive include="home">
      <router-view />
    </keep-alive> -->
    <!-- <tab-bar v-if="!route.meta.hideTabbar"/> -->
    <tab-bar/>
    <loading />
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tab-bar.vue';
import Loading from './components/loading/loading.vue'
// import { useRoute } from 'vue-router';
// route是当前活跃的路由，并且是响应式的
// const route = useRoute()


</script>

<style scoped>

</style>
