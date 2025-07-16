import Markdown from '../Markdown'
import { SuiText } from '../sui'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import Tilt from 'react-parallax-tilt'

type Direction = 'vertical' | 'horizontal'

const classes: Record<string, Record<Direction, string>> = {
  container: {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row gap-6'
  },
  icon: {
    vertical: 'mb-4 mt-2',
    horizontal: 'ml-2 self-start'
  },
  logo: {
    vertical: 'mt-auto max-w-[200px]',
    horizontal:
      'w-40 object-scale-down rounded-2xl bg-gradient-to-r from-neutral-600/40 to-neutral-600/10 px-4 border border-neutral-600/40'
  }
} as const

interface QuoteProps {
  content: React.ReactNode | string
  logo: ImageProps
  className?: string
  direction?: Direction
}

function Quote({
  content,
  logo: { className: logoClassName = '', ...logo },
  className = '',
  direction = 'vertical'
}: QuoteProps) {
  return (
    <div
      className={`animate-fade-in relative h-full w-full rounded-lg border border-neutral-725 bg-neutral-900/50 p-4 text-center shadow-card ${classes.container[direction]} ${className}`}>
      <Image
        src='/images/Quote.svg'
        width={37}
        height={28}
        alt='Quote'
        className={`block ${classes.icon[direction]}`}
      />
      <SuiText color='secondary' className='mb-8 text-left'>
        {typeof content === 'string' ? (
          <Markdown>{content}</Markdown>
        ) : (
          <>{content}</>
        )}
      </SuiText>
      <Image
        {...logo}
        className={`inline-block h-auto ${classes.logo[direction]} ${logoClassName}`}
        alt='Quote'
      />
    </div>
  )
}

export interface QuoteCardProps extends QuoteProps {
  link?:
    | string
    | (Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        keyof LinkProps | 'children'
      > &
        LinkProps &
        React.RefAttributes<HTMLAnchorElement>)
}

export default function QuoteCard({
  link,
  className = '',
  ...quote
}: QuoteCardProps) {
  if (typeof link === 'string') link = { href: link }
  return (
    <>
      {link ? (
        <Tilt
          tiltEnable={false}
          glareEnable={true}
          glareMaxOpacity={0.4}
          glareColor='rgba(251, 255, 70, 0.08)'
          glarePosition='all'
          className='flex-1'>
          <Link {...link}>
            <Quote
              className={`transition hover:border-neutral-700 hover:bg-neutral-725/90 hover:shadow-lg ${className}`}
              {...quote}
            />
          </Link>
        </Tilt>
      ) : (
        <Quote className={className} {...quote} />
      )}
    </>
  )
}
