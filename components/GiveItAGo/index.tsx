import { CUIButton, CUICard } from '../../components/ClickUI'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/solid'

type DeployData = {
  title: string
  img: string
  btnText: string
  description: string
  href: string
  target?: string
  btnType: 'secondary' | 'primary' | 'secondary-dark'
}

const deployData: Array<DeployData> = [
  {
    title: 'ClickHouse Local',
    img: '/laptop.svg',
    btnText: 'Download ClickHouse Local',
    description:
      'Run fast queries on local files (CSV, TSV, Parquet, and more) without a server.',
    href: 'https://clickhouse.com/docs/en/operations/utilities/clickhouse-local',
    btnType: 'secondary'
  },
  {
    title: 'Open-source ClickHouse',
    img: '/drive.svg',
    btnText: 'Download ClickHouse',
    description:
      'Spin up a database server with open-source ClickHouse. Always Free.',
    href: '/#getting_started',
    btnType: 'secondary'
  },
  {
    title: 'ClickHouse Cloud',
    img: '/cloud.svg',
    btnText: 'Start free trial',
    description:
      'Available on AWS, GCP, and through their respective Marketplaces. Azure coming soon.',
    href: 'https://clickhouse.cloud/signUp?loc=deploy-your-way',
    target: '_blank',
    btnType: 'primary'
  }
]
export default function GiveItAGo() {
  return (
    <div className='flex flex-wrap justify-center gap-10 xl:justify-between'>
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
              <div className='cursor-pointer text-xl font-semibold leading-tight text-neutral-0'>
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
              linkClass='w-full inline-grid'
              className='group'
              iconRight={
                <ChevronRightIcon
                  height='18'
                  className='pt-0.5 transition group-hover:translate-x-1/2'
                />
              }
              target={deploy.target}>
              {deploy.btnText}
            </CUIButton>
          </CUICard.Footer>
        </CUICard>
      ))}
    </div>
  )
}
