import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from 'underscore'

// 方式一
// 1.当离开页面要移除监听
// 2.当其他页面也需要监听滚动，会重复代码逻辑
// export default function useScroll(reachBottomCB) {
//   const scrollListenerHander = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop + 1
//     const scrollHeight = document.documentElement.scrollHeight
//     console.log(scrollTop, clientHeight, scrollHeight);
//     if (scrollHeight <= scrollTop + clientHeight) {
//       // 到达底部触发传进来的回调函数
//       if (reachBottomCB) reachBottomCB()
//     }
//   }
//   onMounted(() => {
//     window.addEventListener('scroll', scrollListenerHander)
//   })
//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollListenerHander)
//   })
// }

// 方式二
export default function useScroll(elRef) {
  let el = window

  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 节流
  const scrollListenerHander = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop + 1
      scrollHeight.value = document.documentElement.scrollHeight 
    } else {
      clientHeight.value = elRef.value.clientHeight
      scrollTop.value = elRef.value.scrollTop + 1
      scrollHeight.value = elRef.value.scrollHeight 
    }
    // console.log(clientHeight.value, scrollTop.value,scrollHeight.value )
    if (scrollHeight.value <= scrollTop.value + clientHeight.value) { 
      isReachBottom.value = true 
    }
  }, 100)
  onMounted(() => {
    if(elRef) el = elRef.value  //elRef.value就为传入的元素
    el.addEventListener('scroll', scrollListenerHander)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHander)
  })

  return { isReachBottom, scrollTop, scrollHeight, clientHeight } 
}