import { getFavorHistory, getFavorList } from "@/service/modules/favor";
import { defineStore } from "pinia";


const useFavorStore = defineStore('favor', {
  state: () => ({
    currentIndex: 0,
    favorList: {},
    favorHistoryData: {}
  }),
  actions: {
    async fetchFavorListData() {
      const res = await getFavorList()
      this.favorList = res.data.data
    },
    async fetchFavorHistoryData() {
      const res = await getFavorHistory()
      this.favorHistoryData = res.data.data
    }
  }
})


export default useFavorStore