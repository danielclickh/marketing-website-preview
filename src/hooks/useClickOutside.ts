import { useEffect } from 'react'

export default function useClickOutside(
  ref: React.RefObject<HTMLElement> | Array<React.RefObject<HTMLElement>>,
  callback: (event: MouseEvent) => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const hasNode = (el: null | HTMLElement) => {
        return el?.contains(event.target as Node)
      }

      if (Array.isArray(ref)) {
        let count = 0
        ref.forEach((singleRef) => {
          if (!hasNode(singleRef.current)) {
            count++
          }
        })
        if (count === ref.length) {
          callback(event)
        }
      } else {
        if (!hasNode(ref.current)) {
          callback(event)
        }
      }
    }

    document.addEventListener('mouseup', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref])
}
