import React, { ReactElement } from 'react'
import AwsLogo from './AwsLogo'
import GCPLogo from './GCPLogo'

import styles from './ToggleButtons.module.scss'

export interface Option<T extends string = string> {
  value: T
  label: string
}

export interface ToggleButtonsProps<T extends string = string> {
  options: Array<Option<T>>
  value: string
  onChange: (value: T) => void
}

export function ToggleButtonsProviders<T extends string = string>({
  options,
  value,
  onChange
}: ToggleButtonsProps<T>) {
  return (
    <div className={styles.buttons}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`${value === option.value ? styles.selected : undefined}`}>
          {option.label === 'aws' ? (
            <AwsLogo />
          ) : option.label === 'gcp' ? (
            <GCPLogo />
          ) : (
            option.label
          )}
        </button>
      ))}
    </div>
  )
}
