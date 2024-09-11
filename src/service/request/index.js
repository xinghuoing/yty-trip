import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

class TYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // 拦截器
    this.instance.interceptors.request.use((config) => {
      mainStore.isLoading = true
      return config
    }, (err) => {
      return err
    })

    this.instance.interceptors.response.use((res) => {
      // 对响应数据进行处理，并返回出去
      mainStore.isLoading = false
      return res
    }, (err) => {
      mainStore.isLoading = false
      return err
    })
  }
  
  request(config) {
    // mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainStore.isLoading = false
      }).catch(err => {
        reject(err)
        // mainStore.isLoading = false
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }

}

export default new TYRequest(BASE_URL, TIMEOUT)