import Markdown from '../Markdown'
import { SuiText } from '../sui'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import Tilt from 'react-parallax-tilt'

type Direction = 'vertical' | 'horizontal'

const classes: Record<string, Record<Direction, string>> = {
  blockquote: {
    vertical: 'p-4 flex flex-col',
    horizontal: 'p-4 flex flex-col lg:flex-row lg:gap-8 lg:p-8'
  },
  icon: {
    vertical: 'mb-4 mt-2',
    horizontal: 'mb-4 mt-2 lg:my-0 lg:ml-2 lg:self-start'
  },
  text: {
    vertical: 'mb-8 text-left',
    horizontal: 'mb-8 text-left lg:mb-0'
  },
  footer: {
    vertical: 'mt-auto max-w-[200px] text-left',
    horizontal:
      'mt-auto flex items-center justify-start lg:justify-center max-w-[200px] lg:mt-0 lg:max-w-none flex-shrink-0 lg:w-40 lg:rounded-2xl lg:bg-gradient-to-r lg:from-neutral-600/40 lg:to-neutral-600/10 lg:p-4 lg:border lg:border-neutral-600/40'
  },
  logo: {
    vertical: 'max-w-[200px]',
    horizontal: 'max-w-[200px] lg:max-w-none'
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
    <article
      className={`relative h-full w-full rounded-lg border border-neutral-725 bg-neutral-900/50 text-center shadow-card ${className}`}>
      <blockquote
        className={`relative h-full ${classes.blockquote[direction]}`}>
        <Image
          src='/images/Quote.svg'
          width={37}
          height={28}
          alt='Quote'
          className={`block ${classes.icon[direction]}`}
        />
        <SuiText color='secondary' className={classes.text[direction]}>
          {typeof content === 'string' ? (
            <Markdown>{content}</Markdown>
          ) : (
            <>{content}</>
          )}
        </SuiText>
        <footer className={classes.footer[direction]}>
          <Image
            {...logo}
            className={`inline-block h-auto object-contain object-left pl-0.5 ${classes.logo[direction]} ${logoClassName}`}
            alt='Quote'
          />
        </footer>
      </blockquote>
    </article>
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

  return link ? (
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
  )
}
