import React, { ReactNode } from 'react'
import Info from '../Tooltip'

import styles from './FormControl.module.scss'

import { FormControlProps } from '../../CalculatorTypesOptions'

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
    <div className={marginBottom ? 'mb-10' : ''} id={id ? id : ''}>
      <div className='mb-2 flex items-center gap-x-3'>
        <label className='block text-xs font-bold text-[#B3B6BD]'>
          {label}
        </label>
        {tooltip && <Info content={tooltip} />}
      </div>
      {children}
      {helpText && <p className={styles.helpText}>{helpText}</p>}
      {errorText && <p className={styles.helpText}>{errorText}</p>}
    </div>
  )
}
