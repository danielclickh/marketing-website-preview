import { EyeIcon } from '@heroicons/react/solid'

type TextFieldProps = {
  htmlFor: string
  label?: string
  placeholder?: string
  className?: string
  password?: boolean
}

export function SuiTextField(props: TextFieldProps) {
  return (
    <div className={props.className}>
      {props.label && (
        <label
          htmlFor={props.htmlFor}
          className='block text-xs font-bold text-text-darkest dark:text-text-lightest pb-1'>
          {props.label}
        </label>
      )}
      <div className='mt-1'>
        <input
          type={props.htmlFor}
          name={props.htmlFor}
          id={props.htmlFor}
          className='focus:bg-field_focus bg-default_size focus:bg-focus_size bg-no-repeat transition-field_props ease-in bg-light-grey1a focus:bg-light-grey1 dark:bg-dark-grey1 placeholder-text-dark relative w-full border border-light-grey5 dark:border-dark-grey4 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm'
          placeholder={props.placeholder}
        />
        {props.password && (
          <EyeIcon className='w-4 relative -top-7 left-80 md:left-96 text-gray-400' />
        )}
      </div>
    </div>
  )
}
