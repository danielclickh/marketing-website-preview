import { useRef } from 'react'

export default function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 200
) {
  const lastCall = useRef<number>(0)

  return (...args: Parameters<T>) => {
    const now = new Date().getTime()
    if (now - lastCall.current >= delay) {
      lastCall.current = now
      callback(...args)
    }
  }
}
