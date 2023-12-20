import { ChevronRightIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import comparisons from './comparisons.json'

export default function UseCasesComparisons() {
  return (
    <div className='flex w-full flex-col gap-y-4'>
      {comparisons.map((comparison, index) => {
        return (
          <Link
            href={comparison.href}
            key={index}
            className='w-full rounded-[12px] border border-[#ffffff] border-opacity-[12%] bg-[#363636] p-3 md:p-5 lg:min-w-[600px] lg:max-w-[600px] lg:p-10'>
            <div className='flex items-center justify-between font-basier text-3xl font-semibold'>
              <h3>
                ClickHouse <span className='opacity-30'>vs</span>{' '}
                {comparison.title}
              </h3>
              <ChevronRightIcon height={30} className='stroke-primary-300' />
            </div>
            {comparison.stats && (
              <div className='mt-8 grid grid-cols-3 gap-x-3 text-center md:gap-x-5 lg:gap-x-6'>
                {comparison.stats.map((stat, index) => {
                  return (
                    <div
                      key={index}
                      className='rounded-[4px] bg-[#1F1F1C] text-center'>
                      <Image
                        src={stat.icon}
                        alt={`${stat.bigStat} ${stat.smallText}`}
                        width={stat.iconWidth}
                        height={stat.iconHeight}
                        className='mx-auto pt-4 pb-1'
                      />
                      <h3 className='font-basier text-3xl font-semibold'>
                        {stat.bigStat}
                      </h3>
                      <p className='px-2 pb-4 text-sm md:px-0'>
                        {stat.smallText}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
            <p className='mt-6 text-base text-white'>"{comparison.quote}"</p>
            <Image
              src={comparison.customerLogo}
              alt={`Logo`}
              width={comparison.customerLogoWidth}
              height={comparison.customerLogoHeight}
              className='mt-4'
            />
          </Link>
        )
      })}
    </div>
  )
}
