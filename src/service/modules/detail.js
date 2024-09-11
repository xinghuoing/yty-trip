import tyRequest from '../request'

export function getDetailInfos(houseId) {
  return tyRequest.get({
    url: '/detail/infos',
    params: {
      houseId: houseId
    }
  })
}