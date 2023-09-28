import Script from 'next/script'

const prod = {
  tenentUUID: '8555e54b-cd0b-45d7-9c1c-e9e088bf774a',
  domainUUID: 'e058d040-977c-4594-aa2c-84b844ce5cf0'
}

const dev = {
  tenentUUID: '8555e54b-cd0b-45d7-9c1c-e9e088bf774a',
  domainUUID: '7b4ec9f7-0279-40b5-9f7c-5a3b367566f2'
}

//Staging and Prod instances
const tenentUUID =
  process.env.NEXT_IS_PROD === 'true' ? prod.tenentUUID : dev.tenentUUID
const domainUUID =
  process.env.NEXT_IS_PROD === 'true' ? prod.domainUUID : dev.domainUUID

export default function CookieConsent() {
  return (
    <>
      <Script
        src={`https://cdn-prod.securiti.ai/consent/auto_blocking/${tenentUUID}/${domainUUID}.js`}
        strategy='beforeInteractive'
      />
      {/* Securiti.ai Cookie Banner */}
      <Script
        defer
        data-strict-csp
        src='https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-strict-csp.js'
        data-tenant-uuid={tenentUUID}
        data-domain-uuid={domainUUID}
        data-backend-url='https://app.securiti.ai'
        onReady={() => {
          console.log('in component')
          const cookieSettingsButton = document.querySelector(
            '#cookie-settings-button'
          )
          cookieSettingsButton?.classList.remove('hidden')
          cookieSettingsButton?.classList.add('cmp-revoke-consent')
        }}
      />
      {/* Securiti.ai Cookie Banner */}
    </>
  )
}
