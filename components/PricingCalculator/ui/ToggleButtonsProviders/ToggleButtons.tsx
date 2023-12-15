import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
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
}

export function ToggleButtonsProviders<T extends string = string>({
  options,
  value
}: ToggleButtonsProps<T>) {
  const router = useRouter()
  return (
    <div className={styles.buttons}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            router.push(
              {
                query: {
                  ...router.query,
                  provider: option.value
                }
              },
              undefined,
              { shallow: true }
            )
          }}
          className={`${value === option.value ? styles.selected : undefined}`}>
          {option.value === 'aws' ? (
            <AwsLogo />
          ) : option.value === 'gcp' ? (
            <GCPLogo />
          ) : (
            option.label
          )}
        </button>
      ))}
    </div>
  )
}
