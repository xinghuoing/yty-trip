<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swiperData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>

       <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span 
              class="item" 
              :class="{ active: swiperData[active]?.enumPictureCategory == key }"
            >
            <!-- swiperData[active]是当前位置的元素 -->
            <span class="text">{{ getName(value[0].title) }}</span>
            <span class="count" v-if="swiperData[active]?.enumPictureCategory == key">
              {{ getCategoryIndex(swiperData[active]) }} / {{ value.length }}
            </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
// import useDetailStore from '@/stores/modules/detail';

const props = defineProps({
  swiperData: {
    type: Array,
    default: () => []
  }
})

// const detailStore = useDetailStore()
// detailStore.fetchDetailInfosData(swiperDatahouseId)

// 对数据进行转换[] => {}
const swipeGroup = {}
// 思路一
// for (let item of props.swiperData) {
//   // 都初始化好
//   //swipeGroup = {
//   //   '2': [],
//   //   '4': [],
//   //   '9': []
//   // }
//   swipeGroup[item.enumPictureCategory] = []
// }
// for (let item of props.swiperData) {
//   const valueArray = swipeGroup[item.enumPictureCategory]
//   valueArray.push(item)
// }

// 思路二 
for (let item of props.swiperData) {
  // 如果swipeGroup[item.enumPictureCategory] = 2
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
    // 2就创建2的数组，4就创建4的数组
    swipeGroup[item.enumPictureCategory] = []
    // 1.valueArray = []
    valueArray = swipeGroup[item.enumPictureCategory]
  }
  // 2.是2类别的数据都加到这个数组里了，4的话就4的数据加入进去4的数组
  valueArray.push(item)
}
// console.log(swipeGroup); // {2: Array(9), 4: Array(3), 9: Array(13)}

// 定义方法转换名称
const getName = (name) => {
  return name.replace("：", "").replace("】", "").replace("【", "")
}

const getCategoryIndex = (item) => {
  // 找到此刻轮播图所在的数组中，item就是这个轮播图的数据
  const valueArray = swipeGroup[item.enumPictureCategory]
  // console.log(valueArray, item);
  // findIndex找到索引
  return valueArray.findIndex(data => data === item) + 1
}


</script>

<style lang="less" scoped>
.swipe {

  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    display: flex;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);

    .item {
      margin: 0 3px;

      &.active {
        padding: 0 3px;
        border-radius: 5px;
        background-color: #fff;
        color: #333;
      }

      .count {
        margin-left: 2px;
      }
    }
  }
}
</style>
