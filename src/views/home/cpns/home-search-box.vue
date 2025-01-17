<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="item location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
     <div class="item date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
     </div>
     <van-calendar 
      v-model:show="showCalendar" 
      color="#ff9854"
      type="range"
      :round="false"
      :show-confirm="false"
      @confirm="onConfirm" 
     />

     <div class="item price-count bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
     </div>
     <div class="item keyword bottom-gray-line">关键字/位置/民宿名</div>

     <!-- 热门建议 -->
     <div class="item hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div 
          class="list" 
          :style="{ color: item.tagText.color, background: item.tagText.background.color}"
        >
        {{ item.tagText.text }}</div>
      </template>
     </div>

     <!-- 搜索按钮 -->
    <div class="item search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { formatMonthDay, getDiffDays } from '@/utils/format_date'
import useMainStore from '@/stores/modules/main';

// 跳转城市页面
const router = useRouter()
const cityClick = () => {
  router.push('/city')
}

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log("获取位置成功:", res)
  }, err => {
    console.log("获取位置失败:", err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}
// 保存当前城市位置数据
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)


// 日历时间设置
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))

const stayCount = ref(getDiffDays(startDate.value, endDate.value))

const showCalendar = ref(false)
const onConfirm = (value) => {
  // 设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)
  // 隐藏日历
  showCalendar.value = false
}

// 热门推荐数据
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 监听搜索按钮的点击
const searchBtnClick = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName
    }
  })
}

</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  .city {
    flex: 1;
    font-size: 15px;
    color: #333;
  }
  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      font-size: 12px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.item {
  display: flex;
  align-items: center; //垂直高度居中
  height: 44px;
  padding: 0 20px;
  color: #999;
  
  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
  }

  .date {
    display: flex;
    flex-direction: column; //flex垂直布局
  }

  .tip {
    font-size: 12px;
    color: #999;
  }

  .time {
    margin-top: 3px;
    color: #333;
    font-size: 15px;
    font-weight: 500;
  }
}

.date-range {
  height: 44px;

  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  flex-wrap: wrap;
  height: auto;

  .list {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    line-height: 38px;
    max-height: 50px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>
