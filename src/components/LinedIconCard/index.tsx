import { CUICard } from '../ClickUI'
import { SuiText, SuiTitle } from '../sui'
import book from './assets/book.svg'
import chartLine from './assets/chart-line.svg'
import chatTeardropText from './assets/chat-teardrop-text.svg'
import cloudTick from './assets/cloud-tick.svg'
import database from './assets/database.svg'
import doubleTick from './assets/double-tick.svg'
import enterprise from './assets/enterprise.svg'
import filePy from './assets/file-py.svg'
import gear from './assets/gear.svg'
import guage from './assets/guage.svg'
import keyhole from './assets/keyhole.svg'
import lightning from './assets/lightning.svg'
import listSearch from './assets/list-search.svg'
import lock from './assets/lock.svg'
import magicWand from './assets/magic-wand.svg'
import maximize from './assets/maximize.svg'
import peerdb from './assets/peerdb.svg'
import shieldCheck from './assets/shield-check.svg'
import sidebar from './assets/sidebar.svg'
import sparkles from './assets/sparkles.svg'
import squaresFour from './assets/squares-four.svg'
import tada from './assets/tada.svg'
import toggleRight from './assets/toggle-right.svg'
import usersThree from './assets/users-three.svg'
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
  enterprise,
  'shield-check': shieldCheck,
  lightning,
  lock,
  gear,
  'chat-teardrop-text': chatTeardropText,
  'chart-line': chartLine,
  database: database,
  keyhole: keyhole,
  'magic-wand': magicWand,
  sidebar: sidebar,
  'squares-four': squaresFour,
  'toggle-right': toggleRight,
  'users-three': usersThree,
  'double-tick': doubleTick
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
  title?: string | React.ReactNode
  text?: string | React.ReactNode
}

interface LinedIconCardTitle extends BaseLinedIconCard {
  children?: React.ReactNode
  title: string | React.ReactNode
  text?: string | React.ReactNode
}

interface LinedIconCardText extends BaseLinedIconCard {
  children?: React.ReactNode
  title?: string | React.ReactNode
  text: string | React.ReactNode
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
