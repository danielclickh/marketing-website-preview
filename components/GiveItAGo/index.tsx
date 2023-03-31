import { CUIButton, CUICard } from '../../components/ClickUI'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/solid'

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
    title: 'Clickhouse Local',
    img: '/laptop.svg',
    btnText: 'Download ClickHouse Local',
    description:
      'Run fast queries on local files (CSV, TSV, Parquet, and more) without a server.',
    href: '/',
    btnType: 'secondary'
  },
  {
    title: 'Clickhouse',
    img: '/drive.svg',
    btnText: 'Download ClickHouse',
    description:
      'Spin up a database server with open-source ClickHouse. Always Free.',
    href: '/',
    btnType: 'secondary'
  },
  {
    title: 'ClickHouse Cloud',
    img: '/cloud.svg',
    btnText: 'Deploy in seconds',
    description: 'Deploy a fully managed ClickHouse service on AWS and GCP.',
    href: 'https://clickhouse.cloud',
    target: '_blank',
    btnType: 'primary'
  }
]
export default function GiveItAGo() {
  return (
    <div className='flex flex-col items-center space-y-10 justify-between lg:space-y-0 lg:space-x-10  lg:flex-row'>
      {deployData.map((deploy) => (
        <CUICard
          key={deploy.title}
          className='p-8 bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat w-full max-w-[22.5rem]'>
          <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
            <Image
              src={deploy.img}
              alt={`${deploy.title}`}
              width={64}
              height={64}
            />
            <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-8'>
              <div className='text-xl leading-tight text-neutral-0 cursor-pointer font-semibold'>
                {deploy.title}
              </div>
              <div className='text-neutral-200 text-center text-sm'>
                {deploy.description}
              </div>
            </div>
          </CUICard.Body>
          <CUICard.Footer className='flex items-center w-full '>
            <CUIButton
              type={deploy.btnType}
              href={deploy.href}
              linkClass='w-full inline-grid'
              iconRight={<ArrowRightIcon height='16' />}
              target={deploy.target}>
              {deploy.btnText}
            </CUIButton>
          </CUICard.Footer>
        </CUICard>
      ))}
    </div>
  )
}
