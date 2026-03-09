import { CUIButton } from '../../ClickUI'
import ColumnOrientedIllustration from '../../ColumnOrientedIllustration'
import RowOrientedIllustration from '../../RowOrientedIllustration'
import { SuiText, SuiTitle } from '../../sui'
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
            ClickHouseがこれほど高速な理由
          </SuiTitle>
          <SuiText size='lg' className='mx-auto max-w-screen-md opacity-70'>
            OLAPと相性の良いカラム指向データベースは、ほとんどのクエリを100倍高速に処理することができます。ClickHouseはシステムでアクセス可能なすべてのリソースを最大限に活用し、分析クエリを可能な限り高速化します。
          </SuiText>
        </div>
        <div className='grid grid-cols-1 items-center gap-16 py-16 md:grid-cols-2'>
          <div>
            <RowOrientedIllustration className='mx-auto h-auto max-w-full rounded-lg border border-neutral-700/80 bg-neutral-900' />
            <div className='mb-3 mt-6 text-center font-bold leading-normal text-neutral-0 md:text-left'>
              行指向データベース
            </div>
            <div className='text-center leading-normal text-neutral-200 md:text-left'>
              行指向データベースは、データは行単位で保存され、各行のすべての値が物理的に隣接して格納されます。
            </div>
          </div>
          <div>
            <ColumnOrientedIllustration className='mx-auto h-auto max-w-full rounded-lg border border-neutral-700/80 bg-neutral-900' />
            <div className='mb-3 mt-6 text-center font-bold leading-normal text-neutral-0 md:text-left'>
              カラム指向データベース
            </div>
            <div className='text-center leading-normal text-neutral-200 md:text-left'>
              ClickHouseのようなカラム指向データベースでは、データは列ごとに保存され、同じ列の値がまとめて格納されます。
            </div>
          </div>
        </div>
        <CUIButton
          type='secondary'
          className='group w-auto'
          href='https://clickhouse.com/docs/concepts/why-clickhouse-is-so-fast'
          iconRight={
            <ChevronRightIcon
              height='16'
              className='pt-0.5 transition group-hover:translate-x-1/2'
            />
          }
          target='_blank'
          onClick={useGalaxyOnClick('homePage.whyClickHouse.viewDocsSelect')}>
          ドキュメントで詳しく読む
        </CUIButton>
      </div>
    </div>
  )
}
