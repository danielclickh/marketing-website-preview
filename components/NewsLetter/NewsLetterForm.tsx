import React, { ChangeEvent, useState } from 'react'
import { submitWorkatoForm } from '../../lib/api/workato'
import { validateEmail } from '../../lib/form'
import { SuiButton, SuiTextField, useSnackbar } from '../sui/client'
import styles from './NewsLetterForm.module.scss'

function NewsLetterForm({
  emailLabel,
  submitButtonLabel
}: {
  emailLabel: string
  submitButtonLabel: string
}) {
  const [email, setEmail] = useState<string>('')
  const { openSnackBar } = useSnackbar()
  const onClick = async () => {
    if (!validateEmail(email)) {
      openSnackBar('Please enter a valid email address', 'error')
      return
    }
    try {
      const workatoResp = await submitWorkatoForm('newsletter', {
        email
      })
      const userId = workatoResp?.cloudId ? workatoResp.cloudId : email
      try {
        await window.analytics.track('Form Submitted', {
          email,
          userId,
          _mkt_trk: workatoResp.marketCookie
        })
        await window.analytics.identify(userId, { email })
      } catch (e) {}
      openSnackBar('Thanks for registering to our newsletter!', 'success')
      setEmail('')
    } catch (e: any) {
      openSnackBar(e.mesage, 'error')
    }
  }

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div className='flex align-middle items-start space-x-2'>
      <SuiTextField
        htmlFor='email'
        placeholder={emailLabel}
        value={email}
        onChange={onTextChange}
        className={styles.newsLetterInput}
      />
      <div className='mt-1'>
        <SuiButton type='primary' onClick={onClick}>
          {submitButtonLabel}
        </SuiButton>
      </div>
    </div>
  )
}

export default NewsLetterForm
