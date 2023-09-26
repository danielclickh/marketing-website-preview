import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function CookieConsentSettings() {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      const script = document.createElement('script')
      script.defer = true
      script.setAttribute('data-strict-csp', '')
      script.src =
        'https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-strict-csp.js'
      script.setAttribute(
        'data-tenant-uuid',
        '8555e54b-cd0b-45d7-9c1c-e9e088bf774a'
      )
      script.setAttribute(
        'data-domain-uuid',
        'e058d040-977c-4594-aa2c-84b844ce5cf0'
      )
      script.setAttribute('data-backend-url', 'https://app.securiti.ai')

      document.body.appendChild(script)

      console.log('cookie conset components - route change')
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return null
}

// <script type="text/javascript" src="https://cdn-prod.securiti.ai/consent/auto_blocking/8555e54b-cd0b-45d7-9c1c-e9e088bf774a/e058d040-977c-4594-aa2c-84b844ce5cf0.js"></script>
