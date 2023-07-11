import React, { ChangeEvent, useState } from 'react'
import { submitWorkatoForm } from '../../lib/api/workato'
import { validateEmail } from '../../lib/form'
import { CUIButton } from '../ClickUI'
import { useSnackbar } from '../sui/client'
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
    <div className='relative flex items-center rounded border border-neutral-725 bg-neutral-750 p-1'>
      <div className='w-full'>
        <input
          type='text'
          id='email'
          className={styles.newsLetterInput}
          onChange={onTextChange}
          placeholder={emailLabel}
          value={email}
        />
      </div>
      <CUIButton type='primary' onClick={onClick} className='whitespace-nowrap'>
        {submitButtonLabel}
      </CUIButton>
    </div>
  )
}

export default NewsLetterForm
