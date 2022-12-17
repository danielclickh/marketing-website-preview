import { useRouter } from 'next/router'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ReactNode } from 'react'
import GetStarted from '../components/GetStarted'
import { usePathname } from 'next/navigation'
import { Providers } from './providers'
import '../styles/globals.scss'
import { Inter } from '@next/font/google'
import { AnalyticsBrowser } from '@segment/analytics-next'
import { environment } from '../environments/environment'
type Props = {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})
const analytics = AnalyticsBrowser.load({ writeKey: environment.segmentKey })
export default async function BaseLayout({ children }: Props) {
  // const pathname = usePathname()
  // const showCloud = pathname === '/service-unavailable-country'
  analytics.page()
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <base href='/' />
        <title>Fast Open-Source OLAP DBMS - ClickHouse</title>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <div className='flex flex-col'>
          <Providers>
            {/* @ts-expect-error Server Component */}
            <Header />
            {children}
            {/* @ts-expect-error Server Component */}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
