'use client'
import { AnalyticsBrowser } from '@segment/analytics-next'
import { createContext, ReactNode, useContext } from 'react'
import environment from '../../environment'

const AnalyticsContext = createContext<AnalyticsBrowser>(undefined!)

type Props = {
  children: ReactNode
}
export const AnalyticsProvider = ({ children }: Props) => {
  const analytics = AnalyticsBrowser.load({ writeKey: environment.segmentKey })

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
