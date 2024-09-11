<template>
  <div class="content-list">
    <div class="inner">
      <template v-for="(item, index) in ordersData" :key="item.orderId">
        <div class="item header">
          <div class="name">{{ item.unitName }}</div>
          <div class="status">{{ item.orderStatusDesc }}</div>
        </div>
        <div class="center">
          <img :src="item.unitPicture" alt="">
          <div class="item live-info">
            <div class="common live">
              <div class="top">
                {{ getMonthDay(item.checkInDate) }}
              </div>
              <div class="bottom">
                {{ getWeekStr(item.checkInDate) }}
                {{ item.checkInLatestTime }}
              </div>
            </div>
            <div class="icon"><img src="@/assets/img/order/icon_right_orderlist.png" alt=""></div>
            <div class="common leave">
              <div class="top">
                {{ getMonthDay(item.checkOutDate) }}
              </div>
              <div class="bottom">
                {{ getWeekStr(item.checkOutDate) }}
                {{ item.checkOutLatestTime }}
              </div>
            </div>
            <div class="item total-price">
              <div class="text">支付总价</div>
              <div class="price">¥{{ item.prepayAmount }}</div>
            </div>
          </div>
        </div>
        <div class="item footer">
          <div class="left">
            <img src="@/assets/img/order/icon-time.png" alt="">
            <span class="delay">0分</span>
            <span class="summary">{{ item.summary }}</span>
          </div>
          <div class="right">
            <span class="connect">联系房东</span>
            <span class="topay">去支付</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatMonthDay, getweek } from '@/utils/format_date';

const props = defineProps({
  orderList: {
    type: Object,
    default: () => ({})
  }
})

const ordersData = computed(() => props.orderList.orders)

const getMonthDay = (date) => {
  return formatMonthDay(date)
}

// 定义一个时间表，用于获取周几
const dateTable = {
  '0': '周日',
  '1': '周一',
  '2': '周二',
  '3': '周三',
  '4': '周四',
  '5': '周五',
  '6': '周六',
}

const getWeekStr = (date) => {
  const str = getweek(date)
  return dateTable[str]
}

</script>

<style lang="less" scoped>
.content-list {

  .item {
    display: flex;
    align-items: center;
  }

  .inner {
    padding: 16px 10px 10px 10px;
    .header {
      justify-content: space-between;
      padding: 20px 5px;
      .name {
        font-size: 13px;
        /* 超出16个字隐藏，之所以设置17em是因为省略号占一个位置 */
        width: 17em;
        overflow: hidden;
        /* 显示省略符号来代表被修剪的文本。 */
        text-overflow:ellipsis; 
        /* 文本不换行 */
        white-space:nowrap;
      }
      .status {
        font-size: 17px;
        color: var(--primary-color);
      }
    }

    .center {
      position: relative;
      color: #ededed;
      img {
        width: 100%;
        border-radius: 4px;
      }

      .live-info {
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: rgba(7, 7, 7, 0.6);
        border-radius: 4px;
        .common {
          padding: 2px 8px;
          margin: 10px 8px;
          text-align: center;
          .top {
            font-size: 17px;
          }
          .bottom {
            margin-top: 2px;
            font-size: 12px;
            color: #dfe2e4;
          }
        }
        .icon {
          width: 16px;
          height: 14px;
        }
        .leave {
          border-right: 1px solid #fff;
        }
      }

      .total-price {
        flex: 1;
        flex-direction: column;

        .price {
          margin-top: 2px;
          color: var(--primary-color);
          font-size: 16px;
        }
      }
    }

    .footer {
      justify-content: space-between;
      height: 50px;
      .left {
        img {
          width: 14px;
          height: 14px;
        }
        .delay {
          color: var(--primary-color);
          font-size: 13px;
          margin: 0 1px;
        }
        .summary {
          font-size: 13px;
          color: #333;
        }
      }

      .right {
       
        font-size: 16px;
        .connect {
          margin-right: 10px;
          padding: 6px 8px;
          border: 1px solid #d9d6d6;
          border-radius: 6px;
        }
        .topay {
          background-color: var(--primary-color);
          color: #fff;
          padding: 6px 10px;
          border: 1px solid #d9d6d6;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
