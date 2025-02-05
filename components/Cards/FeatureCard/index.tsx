import Link from 'next/link'
import React from 'react'
import { SuiText } from '../../sui'
interface FeatureCardProps {
  icon: React.ReactNode | undefined
  title: React.ReactNode | string
  description?: string | undefined
  descriptionFullWidth?: boolean
  link?: string
  target?: React.HTMLAttributeAnchorTarget
  prefetch?: boolean
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  descriptionFullWidth = false,
  link,
  target,
  prefetch
}) => {
  const sharedClassName =
    'group flex items-center gap-2 md:w-1/4 lg:w-60 rounded-lg bg-primary-300 px-4 py-4 text-primary-900 flex-col sm:gap-2 sm:px-2 text-center'

  const content = (
    <>
      {icon}
      <h2 className='text-4xl font-bold py-0'>{title}</h2>
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
