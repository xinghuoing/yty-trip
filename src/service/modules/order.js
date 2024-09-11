import tyRequest from '../request'

export function getOrderList(type) {
  return tyRequest.get({
    url: '/order/list',
    params: {
      type: type
    }
  })
}