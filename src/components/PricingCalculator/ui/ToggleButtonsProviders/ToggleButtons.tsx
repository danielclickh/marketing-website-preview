import { ToggleButtonsProps } from '../../CalculatorTypesOptions'
import AwsLogo from './AwsLogo'
import AzureLogo from './AzureLogo'
import GCPLogo from './GCPLogo'
import styles from './ToggleButtons.module.scss'
import { useRouter } from 'next/router'

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
            </div>
          ) : (
            option.label
          )}
        </button>
      ))}
    </div>
  )
}
