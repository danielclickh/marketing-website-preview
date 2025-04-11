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

export function SuiTextField({
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
      <div className={styles.container}>
        {label && (
          <label
            htmlFor={htmlFor}
            className='block pb-1 text-xs font-medium text-neutral-300'>
            {label}
            {!required && <span className='text-c4'></span>}
          </label>
        )}
        <div className='mt-1'>
          <input
            type={type}
            id={htmlFor}
            className={styles.textCommon}
            required={required}
            {...props}
          />
          {type === 'password' && (
            <EyeIcon className='relative -top-7 left-80 w-4 text-gray-400 md:left-96' />
          )}
        </div>
      </div>
      <p
        className={`mt-1 min-h-[1rem] text-xs text-danger-200 transition-opacity ease-in-out ${
          error.length == 0 ? 'opacity-0' : 'opacity-100'
        }`}>
        {error}
      </p>
    </div>
  )
}
