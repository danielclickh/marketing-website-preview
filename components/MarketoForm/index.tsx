import { resolveHref } from 'next/dist/client/resolve-href'
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import { MarketoFormProps } from './types'

export default function MarketoForm(props: MarketoFormProps) {
    const router = useRouter()
    const instanceId = useId()
    const instanceEventPrefix = `mkto-${instanceId}-${props.formId}`;

    const [mountIframe, setMountIframe] = useState(false)
    const [formLoaded, setFormLoaded] = useState(false)
    const [iframeHeight, setIframeHeight] = useState(24)

    useEffect(() => {
        window.addEventListener('message', ({ data }) => {
            if ('type' in data && 'data' in data) {
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
                        if (typeof props.onLoad === 'function') {
                            props.onLoad()
                        }
                        break
                    case `${instanceEventPrefix}-formSuccess`:
                        if (typeof props.onSuccess === 'function') {
                            props.onSuccess(eventData?.response, eventData?.redirect)
                        }
                        break
                }
            }
        })

        setMountIframe(true)
    }, [])


    return <>
        {mountIframe &&<iframe
          src={resolveHref(router, `/marketo-forms/${props.formId}?iid=${encodeURIComponent(instanceId)}`)}
          height={iframeHeight < 24 ? 24 : iframeHeight}
          className={`w-full !bg-transparent transition-opacity no-scrollbar ${formLoaded ? 'opacity-100' : 'opacity-0'}`} />}
    </>
}
