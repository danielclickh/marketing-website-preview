import { CUIButton } from '../../ClickUI'
import Amazonsimple from './logos/Amazonsimple'
import Azureeventhub from './logos/Azureeventhub'
import ConfluentCloud from './logos/ConfluentCloud'
import Googlestorage from './logos/Googlestorage'
import Kafka from './logos/Kafka'
import KinesisAmazon from './logos/KinesisAmazon'
import Managedkafka from './logos/Managedkafka'
import Redpanda from './logos/Redpanda'
import Warpstream from './logos/Warpstream'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import Image from 'next/image'

export default function IntegrationsClickPipesPromo() {
  const handleGalaxyClick = useGalaxyOnClick(
    'integrations.clickpipesPromoSection.learnClickpipesSelect'
  )

  return (
    <div className='px-8 2xl:px-0'>
      <div className='rounded-lg border border-neutral-700/80 bg-neutral-700/50 p-6 lg:p-10'>
        <div className='flex flex-col items-center justify-between gap-10 lg:flex-row'>
          <div className='lg:max-w-[640px]'>
            <h3 className='text-balance font-basier text-3xl font-semibold'>
              ClickHouse Cloudのマネージド型インテグレーションパイプライン。
            </h3>
            <p className='my-4 text-[#B3B6BD]'>
              ClickPipesは膨大な量のデータをさまざまなソースから、ボタンを数回クリックするだけで簡単に取り込むためのインテグレーションエンジンです。
            </p>
            <CUIButton
              href='/jp/cloud/clickpipes'
              type='primary'
              onClick={handleGalaxyClick}>
              ClickPipesの詳細はこちら
            </CUIButton>
          </div>
          <div className='grid grid-cols-5 gap-6 xl:grid-cols-5'>
            <Amazonsimple className='w-full' />
            <KinesisAmazon className='w-full' />
            <Managedkafka className='w-full' />
            <ConfluentCloud className='w-full' />
            <Googlestorage className='w-full' />
            <Image
              src='/images/cloud/integrations/postgres.svg'
              alt='Postgres'
              width={64}
              height={64}
            />
            <Kafka className='w-full' />
            <Azureeventhub className='w-full' />
            <Redpanda className='w-full' />
            <Warpstream className='w-full' />
          </div>
        </div>
      </div>
    </div>
  )
}
