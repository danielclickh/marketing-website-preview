import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ReactNode } from 'react'
import '../styles/globals.scss'
import { Inter } from '@next/font/google'
import { Providers } from '../components/Providers'
type Props = {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter'
})

export default async function BaseLayout({ children }: Props) {
  return (
    <html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <head>
        <meta charSet='utf-8' />
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
        <meta name='twitter:image' content='/images/sql_console_hero.png' />
        <meta name='og:image' content='/images/sql_console_hero.png' />
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
    </html>
  )
}
