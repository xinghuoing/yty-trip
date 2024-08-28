import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

class TYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // 拦截器
    // this.instance.interceptors.request.use((config) => {
    //   console.log("请求拦截成功");
    //   return config
    // }, (err) => {
    //   console.log('请求拦截失败')
    //   return err
    // })

    // this.instance.interceptors.response.use((res) => {
    //   console.log("响应拦截成功");
    //   // 对响应数据进行处理，并返回出去
    //   return res.data
    // }, (err) => {
    //   console.log('响应拦截失败')
    //   return err
    // })
  }
  
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
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