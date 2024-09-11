import { getHomeCategories, getHomeHouseList, getHotSuggests } from '@/service/modules/home'
import { defineStore } from 'pinia'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houseList: []
  }),
  actions: {
    async fetchHotSuggestsData() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHomeHouseList(this.currentPage)
      this.houseList.push(...res.data) 
      this.currentPage++ 
    } 
  }
})

export default useHomeStore