import Head from 'next/head'
import { Header } from '../header'
import { Footer } from '../footer'

type Props = {
  title: string
  description: string
  activePage?: number
}

// @ts-ignore
export function BaseLayout({
  activePage = 0,
  title = '',
  description = '',
  // @ts-ignore
  children
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>

      <div className='flex flex-col'>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}
