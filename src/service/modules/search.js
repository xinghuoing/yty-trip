import tyRequest from '../request'

export function getSearchTop() {
  return tyRequest.get({
    url: '/search/top'
  })
}

export function getSearchResult() {
  return tyRequest.get({
    url: '/search/result'
  })
}
