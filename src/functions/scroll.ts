import { useRef } from 'react'

export function scroll ({
  ref,
  direction,
  distance = 200,
  behavior = 'smooth'
}: {
  ref: ReturnType<typeof useRef<HTMLElement | null>>
  direction: 'left' | 'right' | 'up' | 'down'
  distance?: number
  behavior?: 'smooth' | 'auto'
}): void {
  const scroller = ref.current
  if (scroller) {
    if (direction === 'left') {
      scroller.scrollTo({
        left: scroller.scrollLeft - distance,
        behavior
      })
    } else if (direction === 'right') {
      scroller.scrollTo({
        left: scroller.scrollLeft + distance,
        behavior
      })
    } else if (direction === 'up') {
      window.scrollTo({
        top: scroller.scrollTop - distance,
        behavior
      })
    } else if (direction === 'down') {
      window.scrollTo({
        top: scroller.scrollTop + distance,
        behavior
      })
    }
  }
}
