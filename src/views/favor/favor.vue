<template>
  <div class="favor">
    <favor-collection v-if="currentIndex === 0" :list-data="favorList" />
    <favor-history v-else-if="currentIndex === 1" :history-data="favorHistoryData" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import useFavorStore from '@/stores/modules/favor';
import FavorCollection from './cpns/favor-collection.vue';
import FavorHistory from './cpns/favor-history.vue'


const favorStore = useFavorStore()
favorStore.fetchFavorListData()
favorStore.fetchFavorHistoryData()
const { currentIndex, favorList, favorHistoryData } = storeToRefs(favorStore)

const listData = computed(() => favorList.value.data)
const historyData = computed(() => favorHistoryData.value.data)


</script>

<style lang="less" scoped>

.favor {
  // height: 300px;
  // background: orange;
  // overflow-y: auto;
}

</style>
