import { CUIButton } from '../ClickUI'
import LogoAnnouncementLink from '../LogoAnnouncementLink'
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
import React from 'react'

export default function IntegrationsClickPipesPromo() {
  const handleGalaxyClick = useGalaxyOnClick(
    'integrations.clickpipesPromoSection.learnClickpipesSelect'
  )

  return (
    <div className='px-8 2xl:px-0'>
      <div className='rounded-lg border border-primary-300 bg-neutral-900/60 p-6 lg:p-10'>
        <div className='flex flex-col items-center justify-between gap-10 lg:flex-row'>
          <div className='lg:max-w-[640px]'>
            <h3 className='text-balance font-basier text-3xl font-semibold'>
              Managed integration pipelines for ClickHouse Cloud.
            </h3>
            <p className='my-4 text-[#B3B6BD]'>
              ClickPipes is an integration engine that makes ingesting massive
              volumes of data from a diverse set of sources as simple as
              clicking a few buttons.
            </p>
            <CUIButton
              href='/cloud/clickpipes'
              type='primary'
              onClick={handleGalaxyClick}>
              Learn more about ClickPipes
            </CUIButton>
          </div>
          <div className='grid grid-cols-6 gap-3 sm:gap-6 lg:gap-3 xl:gap-6'>
            <Amazonsimple className='h-auto w-full max-w-12' />
            <KinesisAmazon className='h-auto w-full max-w-12' />
            <Managedkafka className='h-auto w-full max-w-12' />
            <ConfluentCloud className='h-auto w-full max-w-12' />
            <Googlestorage className='h-auto w-full max-w-12' />
            <Image
              src='/images/cloud/integrations/mysql.svg'
              alt='MySQL'
              width={64}
              height={64}
              className='h-auto w-full max-w-12'
            />
            <Image
              src='/images/cloud/integrations/postgres.svg'
              alt='Postgres'
              width={64}
              height={64}
              className='h-auto w-full max-w-12'
            />
            <Kafka className='h-auto w-full max-w-12' />
            <Azureeventhub className='h-auto w-full max-w-12' />
            <Redpanda className='h-auto w-full max-w-12' />
            <Warpstream className='h-auto w-full max-w-12' />
            <Image
              src='/images/cloud/integrations/digitalocean.svg'
              alt='DigitalOcean'
              width={64}
              height={64}
              className='h-auto w-full max-w-12'
            />
          </div>
        </div>
        <LogoAnnouncementLink
          mode='dark'
          className='mt-8 !bg-neutral-700/60'
          href='/cloud/clickpipes/azure-blob-storage-connector?loc=integrations-promo'
          logo={{
            src: '/images/cloud/integrations/postgres.svg',
            alt: 'Postgres',
            width: 46,
            height: 37
          }}>
          Blazing-fast Postgres to ClickHouse CDC with our new ClickPipe
          connector — now Generally Available.{' '}
          <span className='underline group-hover:decoration-2'>Learn more</span>
          !
        </LogoAnnouncementLink>
      </div>
    </div>
  )
}
