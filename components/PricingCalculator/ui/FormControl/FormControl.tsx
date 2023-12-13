import React, { ReactNode } from 'react'
import Info from '../Tooltip'

import styles from './FormControl.module.scss'

export interface FormControlProps {
  children: ReactNode
  label: string
  helpText?: string
  tooltip?: string
}

export const FormControl: React.FC<FormControlProps> = ({
  label,
  helpText,
  children,
  tooltip
}) => {
  return (
    <div className='mb-10'>
      <div className='mb-2 flex items-center gap-x-3'>
        <label className='block text-xs font-bold text-[#B3B6BD]'>
          {label}
        </label>
        {tooltip && <Info content={tooltip} />}
      </div>
      {children}
      {helpText && <p className={styles.helpText}>{helpText}</p>}
    </div>
  )
}
