'use client'
import React, { ReactNode, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAnalytics } from '../Providers/Analytics'

function PageContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const search = useSearchParams()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.page()
  }, [pathname, analytics])

  useEffect(() => {
    setTimeout(() => {
      const hash = window.location.hash
      if (hash) {
        const element = hash ? document.querySelector(hash) : undefined
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          })
        }
      } else {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }, 0)
  }, [pathname, search])

  return <div className='flex flex-col min-h-screen'>{children}</div>
}

export default PageContainer
