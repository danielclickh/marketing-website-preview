import Image, { ImageProps } from 'next/image'
import { LinkProps } from 'next/link'
import React from 'react'
import LinkWithArrow from '../../LinkWithArrow'
import Markdown from '../../Markdown'

interface NavigationQuoteLinkProps extends LinkProps {
  text: string
}

interface NavigationQuoteBaseProps extends React.HTMLProps<HTMLDivElement> {
  logo?: string | ImageProps | typeof Image
  link?: NavigationQuoteLinkProps
}

interface NavigationQuoteWithQuote extends NavigationQuoteBaseProps {
  children?: React.ReactNode
  quote: string
}

interface NavigationQuoteWithChildren extends NavigationQuoteBaseProps {
  children: React.ReactNode
  quote?: string
}

export type NavigationQuoteProps =
  | NavigationQuoteWithQuote
  | NavigationQuoteWithChildren

export default function NavigationQuote({
  children,
  quote,
  logo,
  link,
  ...props
}: NavigationQuoteProps) {
  const renderLogo = (logo: NavigationQuoteProps['logo']) => {
    switch (typeof logo) {
      case 'string':
        return (
          <Image
            src={logo}
            width={38}
            height={38}
            alt='Quote logo'
            className='h-[38px] w-full object-scale-down object-left'
          />
        )
      case 'object':
        return <Image {...logo} alt='Quote logo' />
      default:
        return <>{logo}</>
    }
  }

  return (
    <div {...props}>
      <div className='relative flex min-h-full flex-col'>
        <blockquote
          className={`${
            link ? 'rounded-t-md' : 'rounded-md'
          } flex flex-1 flex-col justify-between bg-white px-4 py-3`}>
          <div className='mb-4 text-wrap text-sm font-semibold text-slate-900'>
            {!!quote && <Markdown encloseByDiv={false}>{quote}</Markdown>}
            {children}
          </div>
          <footer className='flex items-center gap-4'>
            {logo && (
              <span className='flex flex-1 flex-col text-xs text-neutral-500'>
                {renderLogo(logo)}
              </span>
            )}
            <span className='flex aspect-square w-[38px] flex-shrink-0 flex-grow-0 items-center justify-center bg-slate-950 text-primary-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='26'
                height='21'
                fill='none'
                viewBox='0 0 26 21'>
                <path
                  fill='currentColor'
                  d='M12.7.5v6a14 14 0 0 1-1 5.1 21.6 21.6 0 0 1-6 8.6l-5.5-3c.8-1.4 1.5-2.9 2.2-4.6a18 18 0 0 0 1-6V.5h9.3ZM26 .5v6a14 14 0 0 1-1 5.1 21.5 21.5 0 0 1-6 8.6l-5.5-3c.8-1.4 1.5-2.9 2.2-4.6a18 18 0 0 0 1-6V.5H26Z'
                />
              </svg>
            </span>
          </footer>
        </blockquote>
        {link && (
          <LinkWithArrow
            {...link}
            className='block w-full flex-shrink-0 flex-grow-0 rounded-b-md bg-primary-300 px-4 py-2 text-left text-sm font-medium text-primary-900'>
            {link.text}
          </LinkWithArrow>
        )}
      </div>
    </div>
  )
}
