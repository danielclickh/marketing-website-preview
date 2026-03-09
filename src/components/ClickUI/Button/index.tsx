import Link from '../Link'
import styles from './styles.module.scss'
import { ButtonLinkProps, ButtonProps } from './types'
import React from 'react'

function ButtonLink({ href, children, linkClass, ...props }: ButtonLinkProps) {
  if (!href) {
    return React.cloneElement(children, {
      ...props
    })
  }
  return (
    <Link href={href} className={linkClass} {...props}>
      {children}
    </Link>
  )
}

function Button({
  iconRight,
  size,
  iconLeft,
  className = '',
  type,
  disabled,
  onClick,
  weight = 'medium',
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonLink {...props}>
      <button
        disabled={disabled}
        className={`${styles.button} ${className} ${'font-' + weight}`}
        data-type={type}
        data-size={size}
        onClick={(event) => {
          onClick && onClick(event)
        }}>
        {iconLeft && <span className='pr-1'>{iconLeft}</span>}
        <span className='flex items-center whitespace-nowrap'>{children}</span>
        {iconRight}
      </button>
    </ButtonLink>
  )
}

export default Button
