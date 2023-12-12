import React, { ReactNode } from 'react'

import styles from './FormControl.module.scss'

export interface FormControlProps {
  children: ReactNode
  label: string
  helpText?: string
}

export const FormControl: React.FC<FormControlProps> = ({
  label,
  helpText,
  children
}) => {
  return (
    <div className={styles.field}>
      <label className='mb-2 text-xs font-bold text-[#B3B6BD]'>{label}</label>
      {children}
      {helpText && <p className={styles.helpText}>{helpText}</p>}
    </div>
  )
}
