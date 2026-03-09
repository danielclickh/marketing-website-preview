import Link, { LinkProps } from 'next/link'
import React, { Fragment } from 'react'

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
  separator?: React.ReactNode
}

function Breadcrumbs({
  children,
  className = '',
  separator = <span>/</span>,
  ...props
}: BreadcrumbsProps) {
  const items = React.Children.toArray(children)

  const interleaved = items.flatMap((child, index) =>
    index === 0
      ? [child]
      : [
          <Breadcrumbs.Item aria-hidden='true'>{separator}</Breadcrumbs.Item>,
          child
        ]
  )

  return (
    <ul
      className={`flex items-center gap-2 text-base font-semibold text-primary-300 ${className}`}
      {...props}>
      {interleaved.map((item, i) => (
        <Fragment key={i}>{item}</Fragment>
      ))}
    </ul>
  )
}

Breadcrumbs.Item = function ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li {...props}>{children}</li>
}

Breadcrumbs.Link = function ({
  children,
  className = '',
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps) {
  return (
    <Breadcrumbs.Item>
      <Link className={`hover:underline ${className}`} {...props}>
        {children}
      </Link>
    </Breadcrumbs.Item>
  )
}

export default Breadcrumbs
