import { FormControlProps } from '../../CalculatorTypesOptions'
import TooltipInfo from '../Tooltip/tooltip'
import React from 'react'

export const FormControl: React.FC<FormControlProps> = ({
  label,
  helpText,
  children,
  tooltip,
  errorText,
  marginBottom = true,
  id
}) => {
  return (
    <div className={`${marginBottom ? 'mb-10' : ''}`} id={id ? id : ''}>
      <div className='mb-2 flex items-center gap-x-3'>
        <label className='block text-xs font-bold text-[#B3B6BD]'>
          {label}
        </label>
        {tooltip && <TooltipInfo content={tooltip} />}
      </div>
      {children}
      {helpText && (
        <div className='mt-3 flex items-center gap-x-3'>
          {id === 'compression' && (
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                stroke='#66FF73'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
          <p
            className={` ${
              id === 'storageSize' ? 'text-[#66FF73]' : 'text-white'
            } text-xs`}>
            {helpText}
          </p>
        </div>
      )}
      {errorText && <p>{errorText}</p>}
    </div>
  )
}
