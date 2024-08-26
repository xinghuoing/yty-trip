// 如果是服务器资源则不需要这样做，本地资源才需要这样做
// 1.相对路径
// 2.当前路径url
export const getAssetURL = (image) => {
  return new URL(`../assets/img/${image}`,import.meta.url).href
}