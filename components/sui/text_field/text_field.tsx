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
            className='block text-xs font-medium text-neutral-300 pb-1'>
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
            <EyeIcon className='w-4 relative -top-7 left-80 md:left-96 text-gray-400' />
          )}
        </div>
      </div>
      <p
        className={`mt-1 transition-opacity ease-in-out text-danger-200 text-xs min-h-[1rem] ${
          error.length == 0 ? 'opacity-0' : 'opacity-100'
        }`}>
        {error}
      </p>
    </div>
  )
}
