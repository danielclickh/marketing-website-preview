import { CUICard } from '../ClickUI'
import { SuiTitle } from '../sui'
import logoClickhouse from './logo-clickhouse.svg'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'

type Comparison = {
  name: string
  logo: ImageProps['src']
  link: LinkProps['href']
}

export interface MoreComparisonsProps {
  heading?: string
  comparisons: Array<Comparison>
}

export default function MoreComparisons({
  heading = 'More comparisons',
  comparisons
}: MoreComparisonsProps) {
  return (
    <div className='bg-neutral-725 py-16'>
      <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
        <h2 className='mb-8 text-center font-semibold uppercase tracking-wider text-primary-300'>
          {heading}
        </h2>
        <div className='flex flex-wrap justify-center'>
          {comparisons.map(({ name, logo, link }, index) => {
            return (
              <div
                className='w-full max-w-sm space-y-4 p-4 text-center'
                key={index}>
                <Link className='block' href={link}>
                  <CUICard>
                    <div className='flex w-full items-center justify-center gap-8 p-8'>
                      <Image
                        src={logoClickhouse}
                        alt='ClickHouse'
                        width={75}
                        height={76}
                        className='h-[76px] w-[75px] flex-shrink flex-grow-0 object-scale-down object-center'
                      />
                      <strong className='text-4xl font-bold text-primary-300'>
                        vs
                      </strong>
                      <Image
                        src={logo}
                        alt={name}
                        width={75}
                        height={76}
                        className='h-[76px] w-[75px] flex-shrink flex-grow-0 object-scale-down object-center'
                      />
                    </div>
                  </CUICard>
                </Link>
                <SuiTitle type='h3'>ClickHouse vs {name}</SuiTitle>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
