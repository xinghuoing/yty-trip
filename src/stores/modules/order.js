import { getOrderList } from "@/service/modules/order";
import { defineStore } from "pinia";


const useOrderStore = defineStore('order', {
  state: () => ({
    orderList: {},
  }),
  actions: {
    async fetchOrderListData(type) {
      const res = await getOrderList(type)
      this.orderList = res.data.data
    }
  }
})


export default useOrderStore