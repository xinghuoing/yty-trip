import tyRequest from '../request'

export function getFavorList() {
  return tyRequest.get({
    url: '/favor/list'
  })
}

export function getFavorHistory() {
  return tyRequest.get({
    url: '/favor/history'
  })
}
