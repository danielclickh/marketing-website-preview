'use client'
import { LinkIcon } from '@heroicons/react/outline'
import { usePathname } from 'next/navigation'
import React, { HTMLAttributes } from 'react'

function HeaderLink({ id, children }: HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()
  return (
    <div className='md-header-container'>
      {children}
      <a href={`${pathname}#${id}`}>
        <LinkIcon className='w-4 h-4' />
      </a>
    </div>
  )
}

export default HeaderLink
