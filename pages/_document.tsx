import { Main, Head, NextScript, Html } from 'next/document'

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
      </body>
    </Html>
  )
}
