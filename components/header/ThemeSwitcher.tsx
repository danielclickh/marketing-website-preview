'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'

function ThemeSwitcher(props) {
  const { theme, setTheme } = useTheme()

  // {theme === 'dark' ? (
  // ) : (
  //   <div className='flex space-x-4'>
  //     <SunIcon className='w-4 h-4 text-web-light-c4' />
  //     <MoonIcon
  //       className='w-4 h-4 text-gunmetal cursor-pointer'
  //       onClick={() =>
  //         setTheme(theme === 'dark' ? 'light' : 'dark')
  //       }
  //     />
  //   </div>
  // )}
  return (
    <div className='flex space-x-4 transition-all ease-in-out duration-75'>
      <SunIcon
        className={`w-4 h-4 text-web-dark-c4 hover:text-white cursor-pointer ${
          theme === 'dark' ? '' : 'hidden'
        }`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <MoonIcon
        className={`w-4 h-4 text-arsenic hover:text-web-dark-c4 cursor-pointer ${
          theme === 'dark' ? 'hidden' : ''
        }`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </div>
  )
}

export default ThemeSwitcher
