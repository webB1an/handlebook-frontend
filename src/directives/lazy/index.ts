import type { DirectiveBinding } from 'vue'
import errorImage from '~/assets/ai_compass.png'

const imageIsExist = (src: string) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve(true)
    }
    img.onerror = () => {
      resolve(false)
    }
    img.src = src
  })
}

export default function lazy(el: any, bingding: DirectiveBinding) {
  const src = el.src
  el.src = ''
  const io = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      imageIsExist(src).then((exist) => {
        if (exist)
          el.src = src
        else
          el.src = errorImage

        io.disconnect()
      })
    }
  })
  io.observe(el)
}
