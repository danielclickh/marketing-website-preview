'use client'
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import { createContext, ReactNode, useContext, useState } from 'react'
import { SuiText } from '../typography'

export const SnackbarContext = createContext({
  openSnackBar: (message: string, type?: 'success' | 'error') => {}
})

let timer: NodeJS.Timer
export function SnackbarContextProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const [type, setType] = useState<'success' | 'error' | null>(null)
  const closeSnackBar = () => {
    clearTimeout(timer)
    setMessage(null)
    setType(null)
  }
  const openSnackBar = (message: string, type?: 'success' | 'error') => {
    setMessage(message)
    setType(type ?? null)
    timer = setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 5000)
  }
  const value = { openSnackBar }
  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {message && (
        <div className='fixed bottom-3.5 inset-x-0'>
          <div className='flex gap-2 items-center w-fit px-4 py-3 rounded-lg text-sm font-medium mx-auto max-w-screen-sm bg-c3'>
            {type && (
              <div className='w-5 h-5'>
                {type === 'success' && (
                  <CheckIcon className='w-full h-full text-c1-light' />
                )}
                {type === 'error' && (
                  <ExclamationIcon className='w-full h-full text-alerts-danger-text' />
                )}
              </div>
            )}
            <SuiText size='sm' weight='medium' color='white'>
              {message}
            </SuiText>
            <button className='text-c6-link' onClick={() => closeSnackBar()}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
