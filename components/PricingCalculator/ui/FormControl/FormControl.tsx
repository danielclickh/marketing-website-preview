import React, { ReactNode } from 'react';

import styles from './FormControl.module.scss';

export interface FormControlProps {
  children: ReactNode;
  label: string;
  helpText?: string;
}

export const FormControl: React.FC<FormControlProps> = ({
  label,
  helpText,
  children,
}) => {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      {children}
      {helpText && <p className={styles.helpText}>{helpText}</p>}
    </div>
  );
};
