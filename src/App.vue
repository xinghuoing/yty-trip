<template>
  <div class="app">
    <router-view></router-view>
    <!-- <tab-bar v-if="!route.meta.hideTabbar"/> -->
    <tab-bar/>
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tab-bar.vue';
// import { useRoute } from 'vue-router';
// route是当前活跃的路由，并且是响应式的
// const route = useRoute()


</script>

<style scoped>

</style>
