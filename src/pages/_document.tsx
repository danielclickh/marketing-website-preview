import { Head, Html, Main, NextScript } from 'next/document'

export default function BaseLayout() {
  return (
    <Html
      lang='en'
      className='light scroll-smooth'
      style={{ colorScheme: 'light' }}>
      <Head />
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
