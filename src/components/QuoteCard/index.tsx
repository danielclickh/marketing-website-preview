import Markdown from '../Markdown'
import { SuiText } from '../sui'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import Tilt from 'react-parallax-tilt'

interface QuoteProps {
  content: React.ReactNode | string
  logo: ImageProps
  className?: string
}

function Quote({
  content,
  logo: { className: logoClassName = '', ...logo },
  className = ''
}: QuoteProps) {
  return (
    <div
      className={`animate-fade-in relative flex h-full w-full flex-col rounded-lg border border-neutral-725 bg-neutral-900/50 p-4 text-center shadow-card ${className}`}>
      <Image
        src='/images/Quote.svg'
        width={37}
        height={28}
        alt='Quote'
        className='mb-4 mt-2 block'
      />
      <SuiText color='secondary' className='mb-8 text-left'>
        {typeof content === 'string' ? (
          <Markdown>{content}</Markdown>
        ) : (
          <>content</>
        )}
      </SuiText>
      <Image
        {...logo}
        className={`mt-auto inline-block h-auto max-w-[200px] ${logoClassName}`}
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
              className={`hover:bg-neutral-725/90 hover:shadow-lg ${className}`}
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
