<template>
  <div class="content">
    <template v-for="(item, index) in contentItem" :key="item.hotleId">
      <div class="inner">
      <div class="cover">
        <img :src="item.pictureList[0]" alt="">
      </div>
      <div class="info">
        <div class="top item">
          <div class="address">{{ getAddress(item.address) }}</div>
          <div class="summary">
            <template v-for="(iten, indey) in item.unitSummeries.slice(0,2)" :key="indey">
              <span class="text" v-if="indey === 0">{{ iten.text }} ·</span>
              <span class="text" v-else>{{ iten.text }}</span>
            </template>
          </div>
        </div>
        <div class="name item">{{ item.unitName }}</div>
        <div class="discount item">
          <template v-for="(tag, index) in item.houseTags" :key="tag.id">
            <div 
              class="tag" 
              :style="{ color: tag.color, backgroundcolor: tag.background.color}"
            >{{ tag.text }}</div>
          </template>
        </div>
        <div class="price item">
          <div class="finalPrice">¥{{ item.finalPrice }}</div>
          <div class="productPrice">¥{{ item.productPrice }}</div>
          <div class="tip" v-if="item.priceTipBadge">
            <van-icon name="volume" />
            {{ item.priceTipBadge.text }}
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  contentData: {
    type: Object,
    default: () => ({})
  }
})

const contentItem = computed(() => {
  return props.contentData.items
})

// 优化contentData中address的数据
const addressReg = /\([^)]*\)/g
const getAddress = (address) => {
  const result = address.replace(addressReg, '')
  return result
} 

</script>

<style lang="less" scoped>
.content {
  .item {
    display: flex;
    padding: 5px 0;
  }

  .inner {
    padding: 16px 10px 10px 10px;
    .cover {
      img {
        width: 100%;
        border-radius: 6px;
      }
    }
    .info {
      margin: 6px 0;
      .top {
        font-size: 12px;
        align-items: center;
        .address {
          background-color: #333;
          color: #fff;
          padding: 2px 4px;
          
          border-radius: 2px;
        }
        .summary {
          flex: 1;
          color: #786f6f;
          margin-left: 10px;
        }
      }
      .name {
        font-size: 20px;
      }
      .discount {
        flex-wrap: wrap;
        .tag {
          font-size: 13px;
          padding: 2px;
          margin-right: 5px;
        }
      }

      .price {
        align-items: center;
        .finalPrice {
          color: #ff9645;
          font-size: 20px;
          margin-right: 6px;
          font-weight: 600;
        }

        .productPrice {
          margin: 0 3px;
          color: #999;
          font-size: 15px;
          text-decoration: line-through;
          margin-right: 6px;
        }

        .tip {
          padding: 2px 4px;
          border-radius: 10px;
          background-color: rgba(236, 25, 25, 0.736);
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>
