import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.82,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
    })

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => {
      window.clearTimeout(refresh)
      context.revert()
    }
  }, [])
}
