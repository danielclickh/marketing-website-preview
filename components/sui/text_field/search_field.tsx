import { SearchIcon } from '@heroicons/react/outline'
import { EyeIcon } from '@heroicons/react/solid'
import { HTMLAttributes } from 'react'
import styles from './Text.module.scss'

interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
  htmlFor: string
  label?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string
  error?: string
  required?: boolean
}

export function SuiSearchField({
  className,
  label,
  htmlFor,
  type = 'text',
  error = '',
  required = false,
  ...props
}: TextFieldProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlFor}
          className='block text-xs font-bold text-neutral-0 pb-1'>
          {label}
          {!required && <span className='text-c4'></span>}
        </label>
      )}
      <div className='flex mt-1 relative'>
        <div className='absolute left-0 top-0 bottom-0 w-9 grid place-items-center z-10'>
          <SearchIcon width='14' height='14' />
        </div>
        <input
          type={type}
          id={htmlFor}
          className={`${styles.textCommon} ${styles.search}`}
          required={required}
          {...props}
        />
        {type === 'password' && (
          <EyeIcon className='w-4 relative -top-7 left-80 md:left-96 text-gray-400' />
        )}
      </div>
      {error.length > 0 ? (
        <p
          className={`mt-1 transition-opacity ease-in-out text-red-500 text-xs min-h-[1rem] ${
            error.length == 0 ? 'opacity-0' : 'opacity-100'
          }`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
