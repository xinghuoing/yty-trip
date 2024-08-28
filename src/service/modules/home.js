import tyRequest from '../request'

export function getHotSuggests() {
  return tyRequest.get({
    url: '/home/hotSuggests'
  })
}