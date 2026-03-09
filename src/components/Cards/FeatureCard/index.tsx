import { SuiText } from '../../sui'
import Link from 'next/link'
import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode | undefined
  title: React.ReactNode | string
  description?: string | undefined
  descriptionFullWidth?: boolean
  link?: string
  target?: React.HTMLAttributeAnchorTarget
  prefetch?: boolean
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  descriptionFullWidth = false,
  link,
  target,
  prefetch,
  className = ''
}) => {
  const sharedClassName = `group flex items-center gap-2 md:w-1/4 lg:w-60 rounded-lg bg-primary-300 px-4 py-4 text-primary-900 flex-col sm:gap-2 sm:px-2 text-center ${className}`

  const content = (
    <>
      {icon}
      <h2 className='py-0 text-4xl font-bold'>{title}</h2>
      {description && (
        <div className={descriptionFullWidth ? 'w-full' : 'md:w-36'}>
          <SuiText color='inherit' size='sm'>
            {description}
          </SuiText>
        </div>
      )}
    </>
  )

  if (!link) {
    return <div className={sharedClassName}>{content}</div>
  }

  return (
    <Link
      href={link}
      target={target}
      prefetch={prefetch}
      className={sharedClassName}>
      {content}
    </Link>
  )
}

export default FeatureCard
