import { Main, Head, NextScript, Html } from 'next/document'
const gtmId = process.env.NEXT_PUBLIC_GTM ?? 'GTM-TL8H72K'

export default function BaseLayout() {
  return (
    <Html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <Head />
      <body className='antialiased'>
        <Main />
        <NextScript />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
      </body>
    </Html>
  )
}
