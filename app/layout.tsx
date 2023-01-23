import { Header } from '../components/header'
import Footer from '../components/Footer'
import { ReactNode } from 'react'
import '../styles/globals.scss'
import '../styles/highlightjs.scss'
import { Inter } from '@next/font/google'
import { Providers } from '../components/Providers'
import Script from 'next/script'
type Props = {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter'
})

export const revalidate = 60

export default function BaseLayout({ children }: Props) {
  return (
    <html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <head>
        <meta charSet='utf-8' />
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
        <meta name='twitter:card' content='summary_large_image' />
      </head>
      <body className={`${inter.variable} font-inter`}>
        <Providers>
          <div className='flex flex-col min-h-screen'>
            {/* @ts-expect-error Server Component */}
            <Header />
            {children}
            {/* @ts-expect-error Server Component */}
            <Footer />
          </div>
        </Providers>
      </body>
      {/* CookiePro Cookies Consent Notice start for clickhouse.com */}
      <Script
        src='https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js'
        type='text/javascript'
        data-domain-script='dedccc4b-7ab2-47de-935c-073b23b1d9b7'
        strategy='lazyOnload'
      />
      <Script
        id='cookie-consent'
        type='text/javascript'>{`function OptanonWrapper() {}`}</Script>

      {/* CookiePro Cookies Consent Notice start for clickhouse.com */}
      <Script
        src='https://discover.clickhouse.com/js/stripmkttok.js'
        strategy='lazyOnload'
      />
    </html>
  )
}
