import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ReactNode } from 'react'
import { Providers } from './providers'
import '../styles/globals.scss'
import { Inter } from '@next/font/google'
import { AnalyticsBrowser } from '@segment/analytics-next'
import environment from '../environment'
import { SnackbarContextProvider } from '../components/sui'
type Props = {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const analytics = AnalyticsBrowser.load({ writeKey: environment.segmentKey })
export default async function BaseLayout({ children }: Props) {
  analytics.page()
  return (
    <html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <head>
        <meta charSet='utf-8' />
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <SnackbarContextProvider>
            <div className='flex flex-col'>
              {/* @ts-expect-error Server Component */}
              <Header />
              {children}
              {/* @ts-expect-error Server Component */}
              <Footer />
            </div>
          </SnackbarContextProvider>
        </Providers>
      </body>
    </html>
  )
}
