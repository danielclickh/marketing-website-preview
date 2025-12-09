import ScaleToContainer from '@/components/ScaleToContainer'
import formatStat from '@/lib/utils/numbers'
import React from 'react'

export interface GithubStatsProps {
  stars: number
  contributors: number
  prs: number
  releases: number
}

export default function GithubStats({
  stars,
  contributors,
  prs,
  releases
}: GithubStatsProps) {
  return (
    <div className='w-full max-w-max'>
      <ScaleToContainer scaleUp={false}>
        <div className='grid h-[290px] w-[564px] -translate-y-5 grid-cols-4 grid-rows-4 gap-x-16 gap-y-20'>
          {Object.entries({
            Contributors: contributors,
            PRs: prs,
            Releases: releases,
            Stars: stars
          }).map(([label, value], statIndex) => {
            const className = [
              'translate-y-10 -translate-x-5',
              '',
              'translate-y-10 translate-x-2',
              '-translate-x-2'
            ][statIndex % 4]
            return (
              <div
                key={statIndex}
                className={`relative col-span-2 row-span-2 flex items-center justify-center text-7xl font-bold ${className}`}>
                <span className='flex flex-col'>
                  {formatStat(value)}+
                  <span className='text-2xl leading-snug text-primary-300'>
                    {label}
                  </span>
                </span>
              </div>
            )
          })}
        </div>
      </ScaleToContainer>
    </div>
  )
}
