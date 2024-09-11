<template>
  <div class="detail not-tabbar" ref="detailRef">
    <tab-control 
      v-if="showTabControl" 
      class="tabs"
      :titles="names" 
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swiper :swiper-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
      <detail-facility name="设施" :ref="getSectionRef" 
      :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detail-landload name="房东" :ref="getSectionRef" :landload="mainPart.dynamicModule.landlordModule" />
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
    <div class="bottom">
      <detail-actionbar />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import useDetailStore from '@/stores/modules/detail';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import DetailSwiper from './cpns/detail_01-swipe.vue';
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandload from './cpns/detail_04-landload.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'
import detailActionbar from './cpns/detail_09-actionbar.vue'

import TabControl from '@/components/tab-control/tab-control.vue';
import useScroll from '@/hooks/useScroll';
 

const route = useRoute()
const router = useRouter()

// 发送网络请求
const houseId = route.params.id
const detailStore = useDetailStore()
detailStore.fetchDetailInfosData(houseId)

const { detailInfos } = storeToRefs(detailStore)
const mainPart = computed(() => detailInfos.value?.mainPart)  //对较大数据进行拆解

const onClickLeft = () => {
  router.back()
}

// tabControl相关操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

// tab点击下落到对应位置
// const landlordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//   if (value) {
//     sectionEls.push(value.$el)
//   }
// }
// tab点击下落到对应位置,将组件与title联系在一起
/*
  {
    '描述'：描述的组件信息,
    '设施'：设施的组件信息
  }
*/
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  if (value) {
    // 拿到组件name属性的值
    const name = value.$el.getAttribute('name')
    // 给name对应的key设置value值
    sectionEls.value[name] = value.$el
  }
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  // 拿到点击tab对应的key
  const key = Object.keys(sectionEls.value)[index] 
  const el = sectionEls.value[key]
  
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance + 1

  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth'
  })
}


// 页面，滚动时匹配对应tab-control的index
const tabControlRef = ref()

// 优化，放到watch里面触发的太频繁了
// 获取所有区域的offsetTop
const els = computed(() => Object.values(sectionEls.value))
const values = computed(() => els.value.map(el => el.offsetTop))
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  
  if (isClick) return
  let index = values.value.length - 1
  for (let i = 0; i < values.value.length; i++) {
    if (newValue + 44 < values.value[i]) {
      index = i - 1
      break
    }
  } 
  // 优化
  if (tabControlRef.value && tabControlRef.value.currentIndex !== index) {
    tabControlRef.value.currentIndex = index
  }
})


</script>

<style lang="less" scoped>

.tabs {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
