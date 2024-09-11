import { getSearchResult, getSearchTop } from "@/service/modules/search";
import { defineStore } from "pinia";

const useSearchStore = defineStore('search', {
  state: () => ({
    topData: {},
    searchResults: {}
  }),
  actions: {
    async fetchSearchTopData() {
      const res = await getSearchTop()
      this.topData = res.data
    },
    async fetchSearchResultData() {
      const res = await getSearchResult()
      this.searchResults = res.data
    }
  }
})

export default useSearchStore