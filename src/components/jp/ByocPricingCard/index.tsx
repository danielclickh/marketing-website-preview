import { CUIButton, CUICard } from '../../ClickUI'
import { SuiText, SuiTitle } from '../../sui'
import illustration from './illustration.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function ByocPricingCard() {
  return (
    <div className='mt-12 px-6'>
      <CUICard className='relative overflow-hidden bg-neutral-900/50 shadow-card-xl'>
        <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
        <div className='flex flex-col lg:grid lg:grid-cols-3 lg:gap-12'>
          <div className='flex flex-col items-center gap-10 px-6 pt-8 md:flex-row lg:col-span-2 lg:px-0 lg:pb-8'>
            <Image src={illustration} width={233} height={100} alt='AWS' />
            <div>
              <SuiTitle
                type='h3'
                className='mb-3 flex flex-col gap-3 !text-2.75xl font-semibold sm:block'>
                BYOC(既存のクラウドインフラ利用)
              </SuiTitle>
              <SuiText size='sm' className='leading-relaxed'>
                一般的なSaaS製品の導入では対応できない厳しいデータレジデンシー要件やコンプライアンス要件がありますか?当社のBring
                Your Own
                Cloud（既存のクラウドインフラ利用）導入モデルでは、お客様の仮想プライベートクラウド（VPC）でClickHouse
                Cloudの利点を体験できます。{' '}
                <Link
                  href='/cloud/bring-your-own-cloud?loc=pricing-page-component'
                  className='text-primary-300 hover:underline'>
                  詳しく見る
                </Link>
              </SuiText>
            </div>
          </div>
          <div className='flex flex-col p-6'>
            <CUIButton
              href={'/cloud/bring-your-own-cloud?loc=pricing-page-component'}
              weight='medium'
              className='w-full'
              linkClass='my-auto'
              type='secondary'>
              お問合せ
            </CUIButton>
          </div>
        </div>
      </CUICard>
    </div>
  )
}
