import React, { useEffect, useState } from 'react'

export interface CounterAnimationProps {
  max: number
  increment?: number
  interval?: number
  fixedWidth?: boolean
  className?: string
}

export default function CounterAnimation({
  max,
  increment = 1,
  interval = 1000,
  fixedWidth = true,
  className = ''
}: CounterAnimationProps) {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount((prev) => (prev === max ? 1 : prev + increment))
    }, interval)

    return () => window.clearInterval(intervalId)
  }, [interval, max])

  return (
    <span
      className={`${className} ${fixedWidth ? 'inline-block' : ''}`}
      style={fixedWidth ? { width: `${max.toString().length}ch` } : {}}>
      {count}
    </span>
  )
}
