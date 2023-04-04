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

export default function lazy(el: any) {
  const src = el.getAttribute('custom-src')
  const io = new IntersectionObserver(([{ isIntersecting }]) => {
    // eslint-disable-next-line no-console
    console.log('isIntersecting', isIntersecting)
    if (isIntersecting) {
      imageIsExist(src).then((exist) => {
        if (exist)
          el.setAttribute('src', src)
        else
          el.setAttribute('src', errorImage)

        io.disconnect()
      })
    }
  })
  io.observe(el)
}
