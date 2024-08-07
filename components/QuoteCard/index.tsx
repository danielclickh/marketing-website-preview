import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import Tilt from 'react-parallax-tilt'
import Markdown from '../Markdown'
import { SuiText } from '../sui'

interface QuoteProps {
  content: React.ReactNode | string
  logo: Omit<ImageProps, 'className'>
}

function Quote({ content, logo }: QuoteProps) {
  return (
    <div className='animate-fade-in relative flex h-full w-full flex-col rounded-lg border border-neutral-725 bg-neutral-900/50 p-6 px-4 text-center shadow-card hover:bg-neutral-725/90 hover:shadow-lg'>
      <Image
        src='/images/Quote.svg'
        width={37}
        height={28}
        alt='Quote'
        className='mb-4 block'
      />
      <SuiText color='secondary' className='mb-8 text-left'>
        {typeof content === 'string' ? (
          <Markdown children={content} />
        ) : (
          <>content</>
        )}
      </SuiText>
      <Image
        {...logo}
        className='inline-block h-auto max-w-[200px] xl:mt-auto'
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

export default function QuoteCard({ link, ...quote }: QuoteCardProps) {
  if (typeof link === 'string') link = { href: link }
  return (
    <Tilt
      tiltEnable={false}
      glareEnable={true}
      glareMaxOpacity={0.4}
      glareColor='rgba(251, 255, 70, 0.08)'
      glarePosition='all'
      className='flex-1'>
      {link ? (
        <Link {...link}>
          <Quote {...quote} />
        </Link>
      ) : (
        <Quote {...quote} />
      )}
    </Tilt>
  )
}
