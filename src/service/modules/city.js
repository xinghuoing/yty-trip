import tyRequest from '../request'

export function getCityAll() {
  return tyRequest.get({
    url: '/city/all'
  })
}