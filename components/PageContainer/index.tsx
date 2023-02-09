'use client'
import React, { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAnalytics } from '../Providers/Analytics'
import { AnalyticsBrowser } from '@segment/analytics-next'

async function firePageAnalytics(analytics: AnalyticsBrowser) {
  const name = (await analytics.user()).anonymousId()
  const pageAnalytics = new CustomEvent('pageAnalytics', {
    detail: {
      name
    }
  })
  window.dispatchEvent(pageAnalytics)
}

function PageContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.page()
    firePageAnalytics(analytics)
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
  }, [pathname])

  return <div className='flex flex-col min-h-screen'>{children}</div>
}

export default PageContainer
