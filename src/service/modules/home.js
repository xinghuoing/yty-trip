import tyRequest from '../request'

export function getHotSuggests() {
  return tyRequest.get({
    url: '/home/hotSuggests'
  })
}

export function getHomeCategories() {
  return tyRequest.get({
    url: '/home/categories'
  })
}

export function getHomeHouseList(currentPage) {
  return tyRequest.get({
    url: '/home/houselist',
    params: {
      page: currentPage
    }
  })
}