import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React, { CSSProperties } from 'react'
import { FullyQualifiedEvent } from '../../lib/galaxy/client'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { CUIButton, CUICard } from '../ClickUI'
import { SuiTitle } from '../sui'

const yellowPositionStyle = {
  '--left-side': 'auto',
  '--right-side': '30%'
} as CSSProperties

type DeployData = {
  title: string
  img: string
  btnText: string
  description: string
  href: string
  target?: string
  btnType: 'secondary' | 'primary' | 'secondary-dark'
  event: FullyQualifiedEvent
}

const deployData: Array<DeployData> = [
  {
    title: 'ClickHouse Local',
    img: '/laptop.svg',
    btnText: 'Download ClickHouse Local',
    description:
      'Run fast queries on local files (CSV, TSV, Parquet, and more) without a server.',
    href: 'https://clickhouse.com/docs/en/operations/utilities/clickhouse-local',
    btnType: 'secondary',
    event: 'homePage.deploymentOptions.clickhouseLocalSelect'
  },
  {
    title: 'Open-source ClickHouse',
    img: '/drive.svg',
    btnText: 'Download ClickHouse',
    description:
      'Spin up a database server with open-source ClickHouse. Always Free.',

    href: '#getting_started',
    btnType: 'secondary',
    event: 'homePage.deploymentOptions.openSourceSelect'
  },
  {
    title: 'ClickHouse Cloud',
    img: '/cloud.svg',
    btnText: 'Start free trial',
    description:
      'Available on AWS, GCP, and through their respective Marketplaces. Azure coming soon.',
    href: 'https://clickhouse.cloud/signUp?loc=home-deploy-your-way',
    target: '_blank',
    btnType: 'primary',
    event: 'homePage.deploymentOptions.cloudSelect'
  }
]

export default function HomepageSectionDeploy({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`flex w-full flex-col ${className}`} {...props}>
      <div
        className='section-container bg-shadow-element yellow-shadow container mx-auto flex flex-col items-center'
        style={yellowPositionStyle}>
        <Image
          src='/deploy-icon.svg'
          alt='Deploy Icon'
          width={73}
          height={72}
        />
        <SuiTitle type='h2' className='mx-auto mt-8 mb-6 max-w-3xl text-center'>
          Deploy your way
        </SuiTitle>
        <div className='mx-auto max-w-screen-sm text-center leading-normal text-neutral-200'>
          Unlike traditional closed-source OLAP databases, ClickHouse runs on
          every environment, whether it’s on your machine or in the cloud.
        </div>
        <div className='mt-16 flex flex-wrap justify-center gap-10'>
          {deployData.map((deploy) => (
            <CUICard
              key={deploy.title}
              className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
              <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                <Image
                  src={deploy.img}
                  alt={`${deploy.title}`}
                  width={64}
                  height={64}
                />
                <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-8'>
                  <div className='cursor-pointer text-center text-xl font-semibold leading-tight text-neutral-0'>
                    {deploy.title}
                  </div>
                  <div className='text-center text-sm text-neutral-200 lg:min-h-[60px]'>
                    {deploy.description}
                  </div>
                </div>
              </CUICard.Body>
              <CUICard.Footer className='flex w-full items-center '>
                <CUIButton
                  type={deploy.btnType}
                  href={deploy.href}
                  linkClass='w-full inline-grid group'
                  iconRight={
                    <ChevronRightIcon
                      height='18'
                      className='arrow pt-0.5 transition group-hover:translate-x-1/2'
                    />
                  }
                  target={deploy.target}
                  onClick={galaxyOnClick(deploy.event)}>
                  {deploy.btnText}
                </CUIButton>
              </CUICard.Footer>
            </CUICard>
          ))}
        </div>
      </div>
    </div>
  )
}
