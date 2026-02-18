'use client'

import AnnouncementBar from '@/components/AnnouncementBar'
import { getBrowserCookie, setBrowserCookie } from '@/lib/utils/cookies'
import { EntryGlobalAnnouncement } from '@/types/strapi'
import { useEffect, useState } from 'react'

export interface StrapiGlobalAnnouncementProps {
  className?: string
}

export default function StrapiGlobalAnnouncement({
  className
}: StrapiGlobalAnnouncementProps) {
  const [enabled, setEnabled] = useState<boolean>(false)
  const [text, setText] = useState<EntryGlobalAnnouncement['text']>('')
  const [url, setUrl] = useState<EntryGlobalAnnouncement['url']>('')

  useEffect(() => {
    // Fetch announcement from CMS, with optional country targeting
    ;(async () => {
      let countryCode = getBrowserCookie('ch-user-country')

      if (!countryCode) {
        try {
          const geoReq = await fetch('https://ipinfo.io?token=33cfa2cb7f422c')
          const geoRes = await geoReq.json()
          if (geoReq.ok && !geoRes.error) {
            countryCode = geoRes.country
            if (countryCode) {
              setBrowserCookie('ch-user-country', countryCode)
            }
          }
        } catch {}
      }

      const cacheKey = `ch-announcement-${countryCode || 'global'}`

      const reset = () => {
        setEnabled(false)
        setText('')
        setUrl('')
      }

      const set = (data: any) => {
        try {
          const text = data?.text || ''
          const url = data?.url || ''
          if (
            text &&
            url &&
            typeof text === 'string' &&
            typeof url == 'string' &&
            text.trim().length &&
            url.trim().length
          ) {
            setEnabled(true)
            setText(text)
            setUrl(url)
            window.sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ text, url })
            )
            return true
          }
        } catch {
          reset()
        }

        return false
      }

      let usedSessionCache = false

      try {
        const fromSession = window.sessionStorage.getItem(cacheKey)
        const data = JSON.parse(fromSession || '')
        usedSessionCache = set(data)
      } catch {}

      if (!usedSessionCache) {
        try {
          const qs = countryCode ? `?country=${countryCode}` : ''
          const res = await fetch(`/api/announcement${qs}`)
          const data = await res.json()
          set(data)
        } catch {
          reset()
        }
      }
    })()
  }, [])

  return (
    <AnnouncementBar
      enabled={enabled}
      link={url}
      text={text}
      dismissible={true}
      className={className}
    />
  )
}
