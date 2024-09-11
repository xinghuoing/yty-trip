import { getDetailInfos } from "@/service/modules/detail";
import { defineStore } from "pinia";


const useDetailStore = defineStore('detail', {
  state: () => ({
    detailInfos: {}
  }),
  actions: {
    async fetchDetailInfosData(houseId) {
      this.detailInfos = {}
      const res = await getDetailInfos(houseId)
      this.detailInfos = res.data
    }
  }
})

export default useDetailStore