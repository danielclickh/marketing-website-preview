import { EyeIcon } from '@heroicons/react/solid'
import { HTMLAttributes, InputHTMLAttributes } from 'react'

interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
  htmlFor: string
  label?: string
  placeholder?: string
  className?: string
  password?: boolean
}

export function SuiTextField({
  className,
  label,
  htmlFor,
  password,
  ...props
}: TextFieldProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlFor}
          className='block text-xs font-bold text-text-darkest dark:text-white pb-1'>
          {label}
        </label>
      )}
      <div className='mt-1'>
        <input
          type={password ? 'password' : 'text'}
          id={htmlFor}
          className='focus:bg-field_focus bg-default_size focus:bg-focus_size bg-no-repeat transition-field_props ease-in bg-light-grey1a focus:bg-white dark:bg-dark-grey1 placeholder-text-dark relative w-full border border-light-grey5 dark:border-dark-grey4 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm'
          {...props}
        />
        {password && (
          <EyeIcon className='w-4 relative -top-7 left-80 md:left-96 text-gray-400' />
        )}
      </div>
    </div>
  )
}
