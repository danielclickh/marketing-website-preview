import { resolveHref } from 'next/dist/client/resolve-href'
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import Markdown from '../Markdown'

type MarketoFormProps = {
  formId: string
  disclaimer?: string | false

  // Callbacks
  onLoad?: () => any
  onSuccess?: (response: any, redirect: string) => any
}

export default function MarketoForm({
  formId,
  disclaimer = 'By registering, you acknowledge that ClickHouse will process your personal information in accordance with our [Privacy Policy](/legal/privacy-policy).',
  onLoad,
  onSuccess
}: MarketoFormProps) {
  const router = useRouter()
  const instanceId = useId()
  const instanceEventPrefix = `mkto-${instanceId}-${formId}`

  const [mountIframe, setMountIframe] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [iframeHeight, setIframeHeight] = useState(24)

  useEffect(() => {
    const messageReciever = ({ data }: MessageEvent) => {
      if (typeof data === 'object' && 'type' in data && 'data' in data) {
        const eventType = data.type
        const eventData = data.data

        switch (eventType) {
          case `${instanceEventPrefix}-resize`:
            const height = eventData?.height
            const scrollHeight = eventData?.scrollHeight
            setIframeHeight(scrollHeight || height)
            break
          case `${instanceEventPrefix}-formLoaded`:
            setFormLoaded(true)
            if (typeof onLoad === 'function') {
              onLoad()
            }
            break
          case `${instanceEventPrefix}-formSuccess`:
            setFormSuccess(true)
            if (typeof onSuccess === 'function') {
              onSuccess(eventData?.response, eventData?.redirect)
            }
            break
        }
      }
    }

    window.addEventListener('message', messageReciever)
    setMountIframe(true)

    return () => {
      window.removeEventListener('message', messageReciever)
    }
  }, [])

  return (
    <>
      {mountIframe && (
        <iframe
          src={resolveHref(
            router,
            `/marketo-forms/${formId}?iid=${encodeURIComponent(instanceId)}`
          )}
          height={iframeHeight < 24 ? 24 : iframeHeight}
          scrolling='no' // Deprecated but still hides scrollbars
          className={`w-full !bg-transparent transition-opacity ${
            formLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {formLoaded && !formSuccess && disclaimer && disclaimer.length && (
        <div className='disclaimer-text mt-3 text-center text-sm font-medium text-neutral-200'>
          <Markdown>{disclaimer}</Markdown>
        </div>
      )}
    </>
  )
}
