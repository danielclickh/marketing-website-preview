import { CUIButton } from '../../ClickUI'
import CycleText from '../../CycleText'
import { SuiText, SuiTitle } from '../../sui'
import styles from './styles.module.scss'
import Image from 'next/image'
import React from 'react'

export default function HomepageHeroAlt({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={`relative overflow-x-hidden border-primary-300 lg:border-t-[38px] ${className}`}
      {...props}>
      <div className='absolute bottom-0 left-0 top-0 z-10 w-full bg-primary-300 lg:w-1/2'></div>
      <div className='section-container relative z-20 grid lg:grid-cols-2'>
        {/* Text column */}
        <div className='flip-selection relative z-30 bg-primary-300 py-12 text-center text-black lg:py-20 lg:text-left'>
          <SuiTitle
            type='h1'
            className='!text-[2rem] md:!text-[2.5rem] xl:!text-[2.85rem]'>
            <span className='tilted tilted-black'>
              <span className='tilted-content text-white'>リアルタイム</span>
            </span>{' '}
            <br />
            データウェアハウスが変える
            <br />
            <CycleText
              pauseDelay={2000}
              phraseClasses='justify-center lg:justify-start'
              phrases={[
                '分析',
                'オブザーバビリティ',
                '機械学習 & 生成AI',
                'ビジネスインテリジェンス',
                '金融サービス',
                '不正対策 & サイバーセキュリティ',
                'ゲーム'
              ]}
            />
          </SuiTitle>
          <div className='lg:inline-block lg:w-auto'>
            <SuiText className='mb-12 mt-6 w-auto !font-medium lg:!text-[20px]'>
              コストを抑えてクエリの速度を飛躍的に向上させます。
            </SuiText>
            <div className='flex w-auto flex-wrap gap-4 sm:gap-8 md:flex-nowrap md:gap-6'>
              <CUIButton
                type='primary-dark'
                size='lg'
                weight='semibold'
                href='https://console.clickhouse.cloud/signUp?loc=hero'
                target='_blank'
                linkClass='w-full'
                className='w-full'>
                クラウドの無料トライアルを始める
              </CUIButton>
              <CUIButton
                type='secondary-dark'
                weight='semibold'
                size='lg'
                href='https://clickhouse.com/docs/getting-started/quick-start'
                target='_blank'
                linkClass='w-full'
                className='w-full !border-black !text-black !transition-all hover:!text-white'>
                オープンソースをダウンロード
              </CUIButton>
            </div>
          </div>
        </div>

        {/* Graphic column */}
        <div className='relative'>
          {/* Desktop angle separator */}
          <div
            className={`absolute -left-1 -top-[1px] bottom-0 z-20 hidden aspect-[272/608] text-primary-300 lg:block ${styles.angleShadow}`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='272'
              height='608'
              fill='none'
              viewBox='0 0 272 608'
              className='h-full w-auto'>
              <path
                fill='currentColor'
                d='M272 0 0 0 v608 a64 64 0 0 0 61 -45 L227 32 A46 46 0 0 1 272 0 Z'
              />
            </svg>
          </div>

          {/* Hero image */}
          <div className='absolute bottom-0 right-0 top-0 z-10 hidden lg:left-10 lg:block xl:left-14 3xl:left-56'>
            <Image
              src='/images/homepage/home-hero-product-ui.png'
              width={2949}
              height={1806}
              alt='ClickHouse Product Screenshot'
              className='aspect-[2949/1806] h-auto w-full lg:h-full lg:w-auto lg:max-w-none'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
