import { CUIButton } from '../ClickUI'
import { ButtonProps } from '../ClickUI/Button/types'
import styles from './styles.module.scss'
import React from 'react'

interface CtaBaseProps {
  text: string
  target?: ButtonProps['target']
}

interface CtaWithHrefProps extends CtaBaseProps {
  href: string
  onClick?: never
}

interface CtaWithOnClickProps extends CtaBaseProps {
  href?: never
  onClick: ButtonProps['onClick']
}

type CtaProps =
  | CtaWithHrefProps
  | CtaWithOnClickProps
  | (CtaBaseProps & {
      href: ButtonProps['href']
      onClick: ButtonProps['onClick']
    })

export interface StatsHeroProps {
  content: React.ReactNode
  primaryCta?: CtaProps
  secondaryCta?: CtaProps
  statsLabel: string | React.ReactNode
  stats: Array<{ stat: string; label: string }>
}

export default function StatsHero({
  content,
  primaryCta,
  secondaryCta,
  statsLabel,
  stats
}: StatsHeroProps) {
  return (
    <div className='relative overflow-hidden'>
      <div className='container mx-auto flex max-w-7xl flex-col gap-x-10 px-8 lg:flex-row 2xl:px-0'>
        <div className='relative z-10 mx-auto grid max-w-[750px] grid-cols-1 gap-6 pb-10 pt-24 text-center lg:mx-0 lg:pb-24 lg:text-left'>
          {content}

          {(primaryCta || secondaryCta) && (
            <div className='mt-6 flex flex-col gap-4 sm:mx-auto sm:flex-row lg:mx-0'>
              {primaryCta && (
                <CUIButton
                  type='primary'
                  size='lg'
                  weight='semibold'
                  href={primaryCta?.href}
                  target={primaryCta.target}
                  onClick={primaryCta?.onClick}
                  className='w-full lg:w-auto'>
                  {primaryCta.text}
                </CUIButton>
              )}
              {secondaryCta && (
                <CUIButton
                  type='secondary'
                  size='lg'
                  weight='semibold'
                  href={secondaryCta?.href}
                  target={secondaryCta.target}
                  onClick={secondaryCta?.onClick}
                  className='w-full lg:w-auto'>
                  {secondaryCta.text}
                </CUIButton>
              )}
            </div>
          )}
        </div>

        <div className='relative ml-auto w-full rounded-lg bg-primary-300 p-6 lg:max-w-[300px] lg:bg-transparent lg:px-0 lg:py-24'>
          <div
            className={`absolute bottom-0 top-0 z-0 hidden w-dvw bg-primary-300 md:translate-x-24 lg:block xl:translate-x-0 ${styles.angledBackground}`}
          />
          <div className='relative z-10'>
            <p className='mb-4 text-center text-sm font-semibold uppercase tracking-wider text-primary-900 lg:text-right'>
              {statsLabel}
            </p>
            <ul className='space-y-3'>
              {stats.map(({ stat, label }, index) => {
                return (
                  <li
                    key={index}
                    className='grid grid-cols-1 rounded bg-primary-900 py-4 text-center text-white'>
                    <span className='text-4xl font-bold text-primary-300'>
                      {stat}
                    </span>
                    <span>{label}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
