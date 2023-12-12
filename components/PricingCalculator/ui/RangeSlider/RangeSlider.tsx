import React, { ChangeEvent, useCallback } from 'react';

import styles from './RangeSlider.module.scss';

export interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange,
  min,
  max,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (!Number.isNaN(value)) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <div className={styles.control}>
      <input
        type="range"
        value={value}
        onChange={handleChange}
        min={1}
        max={24}
        className={styles.input}
      />
      <span className={styles.value}>{value}</span>
    </div>
  );
};
