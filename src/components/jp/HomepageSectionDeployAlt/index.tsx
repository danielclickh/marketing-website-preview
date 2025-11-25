import { SuiText, SuiTitle } from '../../sui'
import Link from 'next/link'
import React from 'react'

export default function HomepageSectionDeployAlt({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={`my-32 bg-primary-300 py-16 text-primary-900 ${className}`}
      {...props}>
      {/* Intro text */}
      <div className='mb-16 flex justify-center'>
        <div className='flex max-w-[650px] flex-col items-center gap-4 text-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='73'
            height='72'
            fill='none'
            viewBox='0 0 73 72'>
            <rect
              width='70'
              height='70'
              x='1.875'
              y='1'
              stroke='currentColor'
              strokeWidth='2'
              rx='16'
            />
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2.625'
              d='M48.17 51.757H27.58a4.202 4.202 0 0 1-4.18-3.784l-1.26-12.605a4.202 4.202 0 0 1 4.18-4.62h23.11a4.202 4.202 0 0 1 4.18 4.62l-1.26 12.605a4.202 4.202 0 0 1-4.18 3.784v0Z'
            />
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2.625'
              d='M27.37 25.496h21.01m-17.508-5.253h14.006m-11.38 17.07h8.754'
            />
          </svg>
          <SuiTitle type='h2' color='inherit'>
            あなたに合った方法でデプロイ
          </SuiTitle>
          <SuiText size='lg'>
            従来のクローズドソースのデータベースとは異なり、ClickHouseはローカルのコンピューターやクラウドなど、すべての環境でも動作します。
          </SuiText>
        </div>
      </div>

      {/* Cards */}
      <div className='section-container'>
        <div className='mx-auto grid w-full max-w-[800px] grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Cloud */}
          <Link
            href='https://console.clickhouse.cloud/signUp?loc=home-deploy-your-way'
            target='_blank'
            className='group col-span-full flex flex-col items-center justify-center gap-6 rounded-lg bg-neutral-750 p-8 text-center text-white'>
            <svg
              className='text-primary-300'
              xmlns='http://www.w3.org/2000/svg'
              width='58'
              height='43'
              fill='none'
              viewBox='0 0 58 43'>
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 21.5654A20.0003 20.0003 0 0 1 29.3463 3.0878a20.0002 20.0002 0 0 1 27.2694 14.5758 19.9996 19.9996 0 0 1-8.5043 20.5312A19.9995 19.9995 0 0 1 37 41.5654H15a14 14 0 0 1 0-28 14.3779 14.3779 0 0 1 3.475.425'
              />
            </svg>
            <SuiTitle type='h3' className='!text-[24px]'>
              ClickHouse Cloud
            </SuiTitle>
            <SuiText>
              ClickHouseを使うならこれ。AWS、GCP、Azure、およびそれぞれのMarketplaceでご利用いただけます。
            </SuiText>
            <strong className='block w-full rounded bg-white py-2 text-center font-medium text-neutral-900 transition-all group-hover:opacity-80'>
              開始する
            </strong>
          </Link>

          {/* Open Source */}
          <Link
            href='#getting_started'
            className='group flex flex-col items-center justify-center gap-6 rounded-lg bg-neutral-750 p-8 text-center text-white'>
            <svg
              className='text-primary-300'
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='65'
              fill='none'
              viewBox='0 0 64 65'>
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.7019'
                d='M48.9823 36.5654H14.5349c-.9513 0-1.7224.8955-1.7224 2v12c0 1.1046.7711 2 1.7224 2h34.4474c.9513 0 1.7224-.8954 1.7224-2v-12c0-1.1045-.7711-2-1.7224-2ZM48.9823 12.5654H14.5349c-.9513 0-1.7224.8955-1.7224 2v12c0 1.1046.7711 2 1.7224 2h34.4474c.9513 0 1.7224-.8954 1.7224-2v-12c0-1.1045-.7711-2-1.7224-2Z'
              />
              <path
                stroke='currentColor'
                strokeWidth='1.7019'
                d='M43.3751 44.5654c0 .7584-.5051 1.1491-.8715 1.1491-.3664 0-.8714-.3907-.8714-1.1491s.505-1.149.8714-1.149c.3664 0 .8715.3906.8715 1.149ZM43.3751 20.5654c0 .7584-.5051 1.1491-.8715 1.1491-.3664 0-.8714-.3907-.8714-1.1491s.505-1.149.8714-1.149c.3664 0 .8715.3906.8715 1.149Z'
              />
            </svg>
            <SuiTitle type='h3' className='!text-[24px]'>
              ClickHouse
            </SuiTitle>
            <SuiText>
              データベースサーバーをオープンソースのClickHouseで構築（いつでも無料）。
            </SuiText>
            <span className='block w-full rounded border border-primary-600 py-2 text-center transition-colors group-hover:border-primary-500 group-hover:bg-white/5'>
              ClickHouseをダウンロード
            </span>
          </Link>

          {/* Local */}
          <Link
            href='/docs/operations/utilities/clickhouse-local'
            target='_blank'
            className='group flex flex-col items-center justify-center gap-6 rounded-lg bg-neutral-750 p-8 text-center text-white'>
            <svg
              className='text-primary-300'
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='65'
              fill='none'
              viewBox='0 0 64 65'>
              <g
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.6'>
                <path d='M48 48.5654H16c-2.21 0-4-1.8-4-4v-24c0-2.22 1.79-4 4-4h32c2.2 0 4 1.78 4 4v24c0 2.2-1.8 4-4 4Zm-18-14h8' />
                <path d='m20 24.5654 4 4-4 4' />
              </g>
            </svg>
            <SuiTitle type='h3' className='!text-[24px]'>
              ClickHouse Local
            </SuiTitle>
            <SuiText>
              ローカルファイル（CSV、TSV、Parquetなど）に対して、サーバーなしで高速なクエリを実行できます。
            </SuiText>
            <span className='block w-full rounded border border-primary-600 py-2 text-center transition-colors group-hover:border-primary-500 group-hover:bg-white/5'>
              ClickHouse Localをダウンロード
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
