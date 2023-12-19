import { ChevronRightIcon } from '@heroicons/react/outline'
import comparisons from './comparisons.json'

export default function UseCasesComparisons() {
  return (
    <div className='flex w-full flex-col gap-y-4'>
      {comparisons.map((comparison, index) => {
        return (
          <div
            key={index}
            className='w-full rounded-[12px] border border-[#ffffff] border-opacity-[12%] bg-[#363636] p-10 lg:min-w-[600px] lg:max-w-[600px]'>
            <div className='flex items-center justify-between font-basier text-3xl font-semibold'>
              <h3>
                ClickHouse <span className='opacity-30'>vs</span>{' '}
                {comparison.title}
              </h3>
              <ChevronRightIcon height={30} className='stroke-primary-300' />
            </div>
            {comparison.stats && (
              <div className='mt-8 flex gap-x-6'>
                {comparison.stats.map((stat, index) => {
                  return (
                    <div
                      key={index}
                      className='flex grow items-center rounded-[4px] bg-[#1F1F1C] text-center'>
                      {stat.bigStat}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
