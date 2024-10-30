import { Head, Html, Main, NextScript } from 'next/document'
const gtmId = process.env.NEXT_PUBLIC_GTM ?? 'GTM-TL8H72K'

export default function BaseLayout() {
  return (
    <Html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <Head />
      <body className='antialiased'>
        <Main />
        <NextScript />

        {process.env.NEXT_IS_PROD ? (
          // THIS IS PRODUCTION
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
        ) : (
          // THIS IS DEV/LOCAL
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}&gtm_auth=BzKh0v8t1wje2QxxRxIGzA&gtm_preview=env-74&gtm_cookies_win=x`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
        )}
      </body>
    </Html>
  )
}
