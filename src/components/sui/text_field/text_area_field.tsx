import styles from './Text.module.scss'
import { HTMLAttributes } from 'react'

interface TextFieldProps extends HTMLAttributes<HTMLTextAreaElement> {
  htmlFor: string
  label?: string
  name?: string
  placeholder?: string
  value?: string
  error?: string
  required?: boolean
}

export default function SuiTextFieldArea({
  className,
  label,
  htmlFor,
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
          <textarea
            id={htmlFor}
            className={`h-64 ${styles.textCommon}`}
            required={required}
            {...props}></textarea>
        </div>
      </div>
      <p
        className={`mt-1 min-h-[1rem] text-xs text-red-500 transition-opacity ease-in-out ${
          error.length == 0 ? 'opacity-0' : 'opacity-100'
        }`}>
        {error}
      </p>
    </div>
  )
}
