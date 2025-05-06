import { SuiText } from '../typography'
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useRef,
  useState
} from 'react'

export const SnackbarContext = createContext({
  openSnackBar: (message: string, type?: 'success' | 'error') => {}
})

let timer: NodeJS.Timer
export function SnackbarContextProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const [type, setType] = useState<'success' | 'error' | null>(null)
  const ref = useRef<CSSProperties>({})
  const closeSnackBar = () => {
    clearTimeout(timer)
    setMessage(null)
    setType(null)
  }
  const openSnackBar = (message: string, type?: 'success' | 'error') => {
    const cookieBanner = document.querySelector('#onetrust-banner-sdk')
    ref.current = cookieBanner
      ? { height: `${cookieBanner.clientHeight + 40}px` }
      : {}

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
        <div className='fixed inset-x-0 bottom-3.5 z-50' style={ref.current}>
          <div className='mx-auto flex w-fit max-w-screen-sm items-center gap-2 rounded-lg bg-neutral-725 px-4 py-3 text-sm font-medium'>
            {type && (
              <div className='h-5 w-5'>
                {type === 'success' && (
                  <CheckIcon className='h-full w-full text-neutral-0' />
                )}
                {type === 'error' && (
                  <ExclamationIcon className='h-full w-full text-alerts-danger-text' />
                )}
              </div>
            )}
            <SuiText size='sm' weight='medium' color='white'>
              {message}
            </SuiText>
            <button
              className='text-primary-300 hover:underline'
              onClick={() => closeSnackBar()}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
