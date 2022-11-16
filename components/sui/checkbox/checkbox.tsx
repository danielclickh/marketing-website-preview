import { ReactChild, ReactElement } from 'react'

type Props = {
  htmlFor: string
  checked?: boolean
  children: ReactElement
}

export function SuiCheckbox(props: Props) {
  return (
    <div className='relative flex items-start mt-4'>
      <div className='flex items-center h-5'>
        <input
          id={props.htmlFor}
          aria-describedby={props.htmlFor}
          name={props.htmlFor}
          checked={props.checked}
          type='checkbox'
          className='focus:ring-primary_muted h-4 w-4 text-primary_muted border-gray-300 rounded'
        />
      </div>
      <div className='ml-3 text-sm'>
        <label
          htmlFor={props.htmlFor}
          className='text-xs text-gray-700 dark:text-gray-700'>
          {props.children}
        </label>
      </div>
    </div>
  )
}
