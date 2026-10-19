import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useGalaxyScroll() {
  const progressRef = useRef(0)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) {
      progressRef.current = 0
      return undefined
    }

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#inicio',
        start: 'top top',
        endTrigger: '#jornada',
        end: 'center center',
        scrub: 1.1,
        invalidateOnRefresh: true,
        onUpdate: (self) => { progressRef.current = self.progress },
      })
    })

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80)
    const refreshLayout = () => ScrollTrigger.refresh()
    window.addEventListener('astria:layoutchange', refreshLayout)
    return () => {
      window.clearTimeout(refresh)
      window.removeEventListener('astria:layoutchange', refreshLayout)
      context.revert()
    }
  }, [])

  return progressRef
}
