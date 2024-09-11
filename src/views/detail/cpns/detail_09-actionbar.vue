<template>
  <div class="action-bar">
    <div class="inner common">
      <div class="left common">
        <div class="chat">
          <img src="@/assets/img/detail/icon_chat.png" alt="">
          <span class="chat-text">聊天</span>
        </div>
        <div class="price">
          <span class="count">¥1599</span>
          <span class="text">/晚</span>
        </div>
      </div>
      <div class="right common">
        <van-icon name="wap-home" size="20" />
        <span class="reserve">预定当前房源</span>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>

.common {
  height: 50px;
  align-items: center;
  display: flex;
  padding: 0 5px;
}

.action-bar {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;

  .inner {
    .left {
      flex: 1;
      .chat {
        display: flex;        
        align-items: center;
        flex-direction: column;
        padding-right: 6px;
        border-right: 1px solid #c1b8b8;
        img {
          width: 15px;
          height: 15px;
        }

        .chat-text {
          margin-top: 4px;
          font-size: 11px;
        }
      }

      .price {
        .count {
          margin: 0 5px 0 20px;
          font-size: 16px;
          font-weight: 700;
          color: var(--primary-color);
        }
        .text {
          font-size: 12px;
        }
      }
    }

    .right {
      background-color: var(--primary-color);
      color: #f2f3f4;
      padding: 0 10px;
      .reserve {
        font-size: 16px;
        font-weight: 550;
      }
    }
  }
}
</style>
