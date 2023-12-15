import { CUIButton } from '../../ClickUI'
import Info from '../ui/Tooltip'

export default function CTAButtons({
  storageCost,
  computeCostMin,
  computeCostMax,
  storageSize,
  minMemory,
  maxMemory
}: {
  storageCost: number
  computeCostMin: number
  computeCostMax?: number
  storageSize?: number
  minMemory?: number
  maxMemory?: number
}) {
  console.log(storageSize, minMemory, maxMemory)
  return (
    <>
      <div className='flex flex-col gap-4'>
        <CUIButton
          type='primary'
          size='lg'
          weight='semibold'
          href='https://clickhouse.cloud/signUp?loc=pricing-calculator'
          linkClass='w-full'
          className='w-full'>
          <span className='text-sm'>Start free trial</span>
        </CUIButton>
        <CUIButton
          type='secondary'
          size='lg'
          weight='semibold'
          href='https://clickhouse.cloud/signUp?loc=pricing-calculator'
          linkClass='w-full'
          className='w-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-share-2 h-4 w-4'>
            <circle cx='18' cy='5' r='3' />
            <circle cx='6' cy='12' r='3' />
            <circle cx='18' cy='19' r='3' />
            <line x1='8.59' x2='15.42' y1='13.51' y2='17.49' />
            <line x1='15.41' x2='8.59' y1='6.51' y2='10.49' />
          </svg>
          <span className='ml-2 text-sm'>Share</span>
        </CUIButton>
        <CUIButton
          type='secondary'
          size='lg'
          weight='semibold'
          href='/company/contact?loc=pricing-calculator'
          linkClass='w-full'
          className='w-full'>
          <span className='text-sm'>Contact us</span>
        </CUIButton>
      </div>
      <ul className='mt-6 flex flex-col gap-y-4 text-left'>
        <li>
          <div className='flex items-center gap-4'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                stroke='#FCFF74'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <p className='flex items-center gap-x-2'>
              ${storageCost!.toFixed(2)} for storage{' '}
            </p>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-4'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                stroke='#FCFF74'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <p>
              ${computeCostMin} {computeCostMax && ` - $${computeCostMax}`} for
              compute
            </p>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-4'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                stroke='#FCFF74'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className=''>Includes data transfer costs</div>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-4'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                stroke='#FCFF74'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className=''>Includes 2 availability zones</div>
          </div>
        </li>
      </ul>
    </>
  )
}
