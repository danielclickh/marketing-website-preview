import styles from './Text.module.scss'
import { SearchIcon } from '@heroicons/react/outline'
import { EyeIcon } from '@heroicons/react/solid'
import { HTMLAttributes } from 'react'

interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
  htmlFor: string
  label?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string
  error?: string
  required?: boolean
  inputRef?: null | React.Ref<HTMLInputElement>
}

export function SuiSearchField({
  className,
  label,
  htmlFor,
  type = 'text',
  error = '',
  required = false,
  inputRef,
  ...props
}: TextFieldProps) {
  return (
    <div className={className}>
      <div className={styles.container}>
        {label && (
          <label
            htmlFor={htmlFor}
            className='block pb-1 text-xs font-medium text-neutral-300'>
            {label}
            {!required && <span></span>}
          </label>
        )}
        <div className='relative mt-1 flex'>
          <div className='absolute bottom-0 left-0 top-0 z-10 grid w-9 place-items-center'>
            <SearchIcon width='14' height='14' />
          </div>
          <input
            type={type}
            id={htmlFor}
            className={`${styles.textCommon} ${styles.search}`}
            required={required}
            ref={inputRef}
            {...props}
          />
          {type === 'password' && (
            <EyeIcon className='relative -top-7 left-80 w-4 text-gray-400 md:left-96' />
          )}
        </div>
      </div>
      {error.length > 0 ? (
        <p
          className={`mt-1 min-h-[1rem] text-xs text-red-500 transition-opacity ease-in-out ${
            error.length == 0 ? 'opacity-0' : 'opacity-100'
          }`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
