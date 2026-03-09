import { useRef } from 'react'

export default function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 200
) {
  const timeoutRef = useRef<number | null>(null)

  return (...args: Parameters<T>) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
