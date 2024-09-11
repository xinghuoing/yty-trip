<template>
  <div class="nav-bar">
    <div class="left" @click="backClick">
      <van-icon name="arrow-left" size="24" color="#ff9854"/>
      <span class="text">旅途</span>
    </div>
    <div class="center">
      <slot>默认内容</slot>
    </div>
    <div class="right">
      <van-icon name="bars" size="30" color="#ff9854" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()
const backClick = () => {
  router.push('/home')
}

</script>

<style lang="less" scoped>
.nav-bar {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // z-index: 9;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;

  .left {
    display: flex;
    align-items: center;
    .text {
      color: var(--primary-color);
      font-size: 15px;
      font-weight: 600;
    }

  }

  .center {
    flex: 1;
  }

  .right {

  }
}
</style>
