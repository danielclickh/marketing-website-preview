'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='flex space-x-4 transition-all ease-in-out duration-75'>
      <SunIcon
        className={`w-4 h-4 text-philippine_silver hover:text-white cursor-pointer ${
          theme === 'dark' ? '' : 'hidden'
        }`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <MoonIcon
        className={`w-4 h-4 text-arsenic hover:text-philippine_silver cursor-pointer ${
          theme === 'dark' ? 'hidden' : ''
        }`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </div>
  )
}

export default ThemeSwitcher
