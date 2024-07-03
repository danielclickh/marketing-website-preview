import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { CUIButton } from '../ClickUI'
import Amazonsimple from './logos/Amazonsimple'
import Azureeventhub from './logos/Azureeventhub'
import ConfluentCloud from './logos/ConfluentCloud'
import Googlestorage from './logos/Googlestorage'
import Kafka from './logos/Kafka'
import KinesisAmazon from './logos/KinesisAmazon'
import Managedkafka from './logos/Managedkafka'
import Redpanda from './logos/Redpanda'
import Upstash from './logos/Upstash'
import Warpstream from './logos/Warpstream'

export default function IntegrationsClickPipesPromo() {
  return (
    <div className='px-8 2xl:px-0'>
      <div className='rounded-lg border border-neutral-700/80 bg-neutral-700/50 p-6 lg:p-10'>
        <div className='flex flex-col items-center justify-between gap-10 lg:flex-row'>
          <div className='lg:max-w-[640px]'>
            <h3 className='font-basier text-3xl font-semibold'>
              Managed Integration Pipelines for ClickHouse Cloud.
            </h3>
            <p className='my-4 text-[#B3B6BD]'>
              ClickPipes is an integration engine that makes ingesting massive
              volumes of data from a diverse set of sources as simple as
              clicking a few buttons.
            </p>
            <CUIButton
              href='/cloud/clickpipes'
              type='primary'
              onClick={() => {
                galaxyOnClick(
                  'integrations.clickpipesPromoSection.learnClickpipesSelect'
                )
              }}>
              Learn more about ClickPipes
            </CUIButton>
          </div>
          <div className='grid grid-cols-5 gap-6 xl:grid-cols-5'>
            <Amazonsimple className='w-full' />
            <KinesisAmazon className='w-full' />
            <Managedkafka className='w-full' />
            <ConfluentCloud className='w-full' />
            <Googlestorage className='w-full' />
            <Redpanda className='w-full' />
            <Kafka className='w-full' />
            <Upstash className='w-full' />
            <Azureeventhub className='w-full' />
            <Warpstream className='w-full' />
          </div>
        </div>
      </div>
    </div>
  )
}
