import { Header } from '../components/header'
import Footer from '../components/Footer'
import { ReactNode } from 'react'
import '../styles/globals.scss'
import '../styles/highlightjs.scss'
import { Inter } from '@next/font/google'
import { Providers } from '../components/Providers'
import Script from 'next/script'
import environment from '../environment'
import PageContainer from '../components/PageContainer'

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
        {/* CookiePro Cookies Consent Notice start for clickhouse.com */}

        <Script
          src='https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js'
          charSet='UTF-8'
          type='text/javascript'
          data-domain-script={`dedccc4b-7ab2-47de-935c-073b23b1d9b7${
            environment.production ? '' : '-test'
          }`}
          strategy='lazyOnload'
        />
        <Script
          id='cookie-consent'
          type='text/javascript'>{`function OptanonWrapper() {}`}</Script>

        {/* CookiePro Cookies Consent Notice start for clickhouse.com */}
        <meta charSet='utf-8' />
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta http-equiv='cache-control' content='max-age=0' />
        <meta http-equiv='cache-control' content='no-cache' />
        <meta http-equiv='expires' content='0' />
        <meta http-equiv='expires' content='Tue, 01 Jan 1980 1:00:00 GMT' />
        <meta http-equiv='pragma' content='no-cache' />
      </head>
      <body
        className={`${inter.variable} font-inter`}
        data-segment={environment.segmentKey}
        data-env={process.env.APP_ENV}>
        <Providers writeKey={environment.segmentKey}>
          <PageContainer>
            {/* @ts-expect-error Server Component */}
            <Header />
            {children}
            {/* @ts-expect-error Server Component */}
            <Footer />
          </PageContainer>
        </Providers>
        <button id='ot-sdk-btn' className='ot-sdk-show-settings hidden'>
          Cookie Settings
        </button>
        <script
          src='https://discover.clickhouse.com/js/stripmkttok.js'
          type='text/javascript'
          async
        />

        {/* Google Analytics for clickhouse.com */}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${environment.googleTagManagerId}`}
          type='text/javascript'
          strategy='lazyOnload'
        />
        <Script id='ga-script' type='text/javascript'>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${environment.googleTagManagerId}', {
              page_path: window.location.pathname,
            });
          `}</Script>

        {/* Google Analytics clickhouse.com */}

        <Script
          id='change-ClickHouse-CloudLinks'
          src='/changeClickhouseCloudLinks.js'
          type='text/javascript'
          async
        />
      </body>
    </html>
  )
}
