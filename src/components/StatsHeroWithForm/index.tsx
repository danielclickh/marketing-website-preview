import { CUICard } from '../ClickUI'
import styles from './styles.module.scss'
import Image, { ImageProps } from 'next/image'
import React from 'react'

export interface StatsHeroProps {
  content: React.ReactNode
  form: React.ReactNode
  statsLabel: string | React.ReactNode
  stats: Array<{ stat: string; icon: Omit<ImageProps, 'className'> }>
}

export default function StatsHeroWithForm({
  content,
  form,
  statsLabel,
  stats
}: StatsHeroProps) {
  return (
    <div className='relative overflow-hidden'>
      <div className='container mx-auto flex max-w-7xl flex-col gap-x-10 px-8 lg:flex-row 2xl:px-0'>
        <div className='relative z-10 mx-auto flex max-w-xl flex-col gap-6 pb-16 pt-24 text-center lg:mx-0 lg:pb-24 lg:text-left'>
          {content}

          <div className='mt-10'>
            <p className='mb-4 text-center text-sm tracking-wider lg:text-left'>
              {statsLabel}
            </p>
            <ul className='space-y-3 lg:max-w-lg'>
              {stats.map(({ stat, icon }, index) => {
                return (
                  <li key={index}>
                    <CUICard>
                      <div className='flex w-full divide-x divide-neutral-700/80 p-4'>
                        <div className='flex-shrink-0 flex-grow-0 pr-4'>
                          <Image
                            {...icon}
                            className='h-8 w-8 object-scale-down object-center'
                            alt='stat image'
                          />
                        </div>
                        <div className='flex flex-1 items-center pl-4 text-lg'>
                          {stat}
                        </div>
                      </div>
                    </CUICard>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className='relative mx-auto w-full max-w-xl lg:mr-0 lg:max-w-lg lg:py-24'>
          <div
            className={`absolute bottom-0 left-8 top-0 z-0 hidden w-dvw bg-primary-300 lg:block ${styles.angledBackground}`}
          />
          <div className='relative z-10 rounded-lg border border-neutral-700/80 bg-neutral-800 p-8'>
            <div>{form}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
