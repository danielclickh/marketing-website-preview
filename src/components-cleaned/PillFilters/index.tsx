import Link from 'next/link'
import React from 'react'

type LinkFilter = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  'children'
> & {
  kind: 'link'
  label: string
  active?: boolean
}

type ButtonFilter = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  kind: 'button'
  label: string
  active?: boolean
}

export type Filter = LinkFilter | ButtonFilter

export interface PillFiltersProps {
  options: Array<Filter>
  className?: string
  basePillClassName?: string
  activePillClassName?: string
  inactivePillClassName?: string
}

export default function PillFilters({
  options,
  className = '',
  basePillClassName = 'mb-2 flex h-9 transform cursor-pointer items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors duration-500 ease-in-out lg:mb-0',
  activePillClassName = 'bg-primary-300 border-primary-600/60 text-neutral-800',
  inactivePillClassName = 'border-primary-600/60 text-neutral-0 hover:border-primary-300'
}: PillFiltersProps) {
  return (
    <ul className={`md:flex md:flex-wrap md:gap-2.5 ${className}`}>
      {options.map((option, i) => {
        const { label, active = false } = option
        const mergedClass = `${basePillClassName} ${active ? activePillClassName : inactivePillClassName} ${option.className ?? ''}`

        if (option.kind === 'link') {
          const {
            kind,
            className: _c,
            active: _a,
            label: _l,
            ...linkProps
          } = option
          return (
            <li key={i}>
              <Link
                {...linkProps}
                className={mergedClass}
                aria-current={active ? 'page' : undefined}>
                {label}
              </Link>
            </li>
          )
        }

        const {
          kind,
          className: _c,
          active: _a,
          label: _l,
          type,
          ...buttonProps
        } = option
        return (
          <li key={i}>
            <button
              {...buttonProps}
              type={type ?? 'button'}
              className={mergedClass}
              aria-pressed={active}>
              {label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
