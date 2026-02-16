'use client'

import { useSecuritiCookieBanner } from '@/components-cleaned/SecuritiCookieBanner'
import { GoogleTagManager as Gtm } from '@next/third-parties/google'

export default function GoogleTagManager() {
  const { initiated, staging } = useSecuritiCookieBanner()
  return (
    <>
      {initiated && !staging && (
        <Gtm
          gtmId='GTM-WKSRXS8S'
          gtmScriptUrl='https://clickhouse.com/gtmwksrxs8s/'
        />
      )}
    </>
  )
}
