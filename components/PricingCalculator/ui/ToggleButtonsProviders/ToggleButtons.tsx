import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import AwsLogo from './AwsLogo'
import GCPLogo from './GCPLogo'

import styles from './ToggleButtons.module.scss'

import { Option, ToggleButtonsProps } from '../../CalculatorTypesOptions'
import AzureLogo from './AzureLogo'
import { SuiText } from '../../../sui'

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
          ) : option.value === 'azure' ? (
            <div className='relative'>
              <AzureLogo />
              <SuiText
                size='xs'
                weight='medium'
                color='secondary'
                className='absolute -right-10 -top-4 rounded-lg bg-neutral-300 px-2.5 text-sm text-neutral-900'>
                Beta
              </SuiText>
            </div>
          ) : (
            option.label
          )}
        </button>
      ))}
    </div>
  )
}
