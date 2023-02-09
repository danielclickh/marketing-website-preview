'use client'
import React, { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'

function PageContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname()

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
