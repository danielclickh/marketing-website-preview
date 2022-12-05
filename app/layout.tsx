import { useRouter } from 'next/router'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ReactNode } from 'react'
import GetStarted from '../components/GetStarted'
import { usePathname } from 'next/navigation'
import { Providers } from './providers'
import '../styles/globals.scss'

type Props = {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  // const pathname = usePathname()
  // const showCloud = pathname === '/service-unavailable-country'
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />

        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='icon' type='image/png' href='/favicon.png' />
      </head>
      <body>
        <div className='flex flex-col'>
          <Providers>
            <Header />
            {children}
            <GetStarted showCloud={true} />
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
