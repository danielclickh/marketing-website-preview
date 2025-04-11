import { CUICard } from '../ClickUI'
import { SuiText, SuiTitle } from '../sui'
import book from './assets/book.svg'
import cloudTick from './assets/cloud-tick.svg'
import enterprise from './assets/enterprise.svg'
import filePy from './assets/file-py.svg'
import guage from './assets/guage.svg'
import listSearch from './assets/list-search.svg'
import maximize from './assets/maximize.svg'
import peerdb from './assets/peerdb.svg'
import sparkles from './assets/sparkles.svg'
import tada from './assets/tada.svg'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import React from 'react'

const icons = {
  guage,
  sparkles,
  maximize,
  tada,
  'cloud-tick': cloudTick,
  peerdb,
  book,
  'list-search': listSearch,
  'file-py': filePy,
  enterprise
}

type Icons = keyof typeof icons

type Icon = Icons | Omit<ImageProps, 'width' | 'height'>

interface BaseLinedIconCard {
  icon: Icon
  className?: string
  link?:
    | string
    | Omit<
        LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'className'
      >
}

interface LinedIconCardChildren extends BaseLinedIconCard {
  children: React.ReactNode
  title?: string
  text?: string
}

interface LinedIconCardTitle extends BaseLinedIconCard {
  children?: React.ReactNode
  title: string
  text?: string
}

interface LinedIconCardText extends BaseLinedIconCard {
  children?: React.ReactNode
  title?: string
  text: string
}

export type LinedIconCardProps =
  | LinedIconCardChildren
  | LinedIconCardTitle
  | LinedIconCardText

function Icon(props: Omit<ImageProps, 'width' | 'height' | 'className'>) {
  return (
    <Image
      {...props}
      width={72}
      height={72}
      className='mx-auto aspect-square w-[72px] rounded border border-jet bg-black/40 object-scale-down object-center shadow-sm'
    />
  )
}

export default function LinedIconCard({
  icon,
  children,
  title,
  text,
  link,
  className = ''
}: LinedIconCardProps) {
  return (
    <CUICard className={`relative overflow-hidden p-8 ${className}`}>
      <div className='absolute left-0 right-0 top-0 h-1 bg-primary-300' />
      <CUICard.Body className='space-y-4 text-center'>
        {typeof icon === 'object' && <Icon {...icon} />}
        {typeof icon === 'string' && icon in icons && (
          <Icon src={icons[icon]} alt={icon} />
        )}
        {title && (
          <SuiTitle type='h3' className='!text-2xl'>
            {title}
          </SuiTitle>
        )}
        {text && (
          <SuiText className='text-balance text-white/70'>{text}</SuiText>
        )}
        {children}
      </CUICard.Body>
      {link && (
        <Link
          {...(typeof link === 'string' ? { href: link } : link)}
          className='absolute inset-0 z-20'
        />
      )}
    </CUICard>
  )
}
