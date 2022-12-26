import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import { createContext, ReactNode, useContext, useState } from 'react'

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
    }, 500)
  }
  const value = { openSnackBar }
  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {message && (
        <div className='px-4 py-3 rounded-lg text-sm font-medium'>
          {type && (
            <div className='w-5 h-5'>
              {type === 'success' && <CheckIcon className='w-full h-full' />}
              {type === 'error' && (
                <ExclamationIcon className='w-full h-full ' />
              )}
            </div>
          )}
          <div>{message}</div>
          <button onClick={() => closeSnackBar()}>Dismiss</button>
        </div>
      )}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
