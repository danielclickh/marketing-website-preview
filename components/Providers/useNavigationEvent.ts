'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function useNavigationEvent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname, searchParams])
}
