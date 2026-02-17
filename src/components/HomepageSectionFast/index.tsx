import { CUIButton } from '../ClickUI'
import ColumnOrientedIllustration from '../ColumnOrientedIllustration'
import RowOrientedIllustration from '../RowOrientedIllustration'
import { SuiText, SuiTitle } from '../sui'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'

export default function HomepageSectionFast({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`relative flex flex-col gap-y-28 ${className}`} {...props}>
      <div className='section-container bg-shadow-element flex w-full flex-col items-center justify-between self-center md:px-16'>
        <div className='flex w-full flex-col items-center text-center'>
          <Image
            src='/fast-icon.svg'
            alt='Fast Icon'
            width={72}
            height={72}
            className='mb-8'
          />
          <SuiTitle type='h2' color='inherit' className='mb-4'>
            Why is ClickHouse so fast?
          </SuiTitle>
          <SuiText size='lg' className='mx-auto max-w-screen-md opacity-70'>
            Column-oriented databases are better suited to OLAP scenarios. They
            are at least <span className='font-bold'>100x faster</span> in
            processing most queries. ClickHouse uses all available system
            resources to their full potential to process each analytical query
            as fast as possible.
          </SuiText>
        </div>
        <div className='grid grid-cols-1 items-center gap-16 py-16 md:grid-cols-2'>
          <div>
            <RowOrientedIllustration className='mx-auto h-auto max-w-full rounded-lg border border-neutral-700/80 bg-neutral-900' />
            <div className='mb-3 mt-6 text-center font-bold leading-normal text-neutral-0 md:text-left'>
              Row-oriented databases
            </div>
            <div className='text-center leading-normal text-neutral-200 md:text-left'>
              In row-oriented databases, data is stored in rows, with all the
              values related to a row physically stored next to each other.
            </div>
          </div>
          <div>
            <ColumnOrientedIllustration className='mx-auto h-auto max-w-full rounded-lg border border-neutral-700/80 bg-neutral-900' />
            <div className='mb-3 mt-6 text-center font-bold leading-normal text-neutral-0 md:text-left'>
              Column-oriented databases
            </div>
            <div className='text-center leading-normal text-neutral-200 md:text-left'>
              In column-oriented databases, like ClickHouse, data is stored in
              columns, with values from the same columns stored together.
            </div>
          </div>
        </div>
        <CUIButton
          type='secondary'
          className='group w-auto'
          href='https://clickhouse.com/docs/concepts/why-clickhouse-is-so-fast'
          prefetch={false}
          iconRight={
            <ChevronRightIcon
              height='16'
              className='pt-0.5 transition group-hover:translate-x-1/2'
            />
          }
          onClick={useGalaxyOnClick('homePage.whyClickHouse.viewDocsSelect')}>
          Read more in the docs
        </CUIButton>
      </div>
    </div>
  )
}
