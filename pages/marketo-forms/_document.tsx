import { Main, Head, NextScript, Html } from 'next/document'
import { useEffect } from 'react'

export default function BaseLayout() {
  return (
    <body>
      <Main />
      <NextScript />
    </body>
  )
}
