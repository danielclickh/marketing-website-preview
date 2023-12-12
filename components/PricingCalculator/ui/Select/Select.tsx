import React, { ChangeEvent, useCallback } from 'react'

import styles from './Select.module.scss'

export interface Option {
  value: string
  label: string
}

export interface SelectProps {
  id: string
  options: Array<Option>
  value: string
  onChange: (value: string) => void
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  value,
  id
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value)
      console.log(id)
    },
    [onChange]
  )

  return (
    <select
      onChange={handleChange}
      value={value}
      className={styles.select}
      id={id}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
