import { Main, Head, NextScript, Html } from 'next/document'
const gtmId = process.env.NEXT_PUBLIC_GTM ?? 'GTM-P52RCTZ'

export default function BaseLayout() {
  return (
    <Html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <Head>
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
      </Head>
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
