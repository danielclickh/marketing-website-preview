'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='flex space-x-4 transition-all ease-in-out duration-75'>
      <SunIcon
        className={`w-4 h-4 text-c4-dark hover:text-c1-light cursor-pointer ${
          theme === 'dark' ? '' : 'hidden'
        }`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <MoonIcon
        className={`w-4 h-4 text-c3 hover:text-c4-dark cursor-pointer ${
          theme === 'dark' ? 'hidden' : ''
        }`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </div>
  )
}

export default ThemeSwitcher
