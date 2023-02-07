'use client'
import { AnalyticsBrowser } from '@segment/analytics-next'
import { createContext, ReactNode, useContext } from 'react'

const AnalyticsContext = createContext<AnalyticsBrowser>(undefined!)

type Props = {
  children: ReactNode
  writeKey: string
}

export const AnalyticsProvider = ({ children, writeKey }: Props) => {
  const analytics = AnalyticsBrowser.load({ writeKey })

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalytics = () => {
  const result = useContext(AnalyticsContext)
  if (!result) {
    throw new Error('Context used outside of its Provider!')
  }
  return result
}
