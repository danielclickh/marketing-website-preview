import { ChangeEvent, ReactNode, useState } from 'react'
import { submitWorkatoForm } from '@/lib/api/workato'
import { validateEmail } from '@/lib/form'
import { SuiButton, SuiTextField, useSnackbar } from '../sui/client'

type StatusType = {
  loading: boolean
  error?: string
  success?: boolean
}

interface ServiceUnavailableFormProps {
  children: ReactNode
  emailLabel: string
  success: string
  btnText: string
}

function ServiceUnavailableForm({
  children,
  emailLabel,
  success: successMsg,
  btnText
}: ServiceUnavailableFormProps) {
  const { openSnackBar } = useSnackbar()
  const [email, setEmail] = useState<string>()
  const [status, setStatus] = useState<StatusType>({
    loading: false
  })
  const isValid = (): boolean => {
    if (!email || email.length === 0) {
      setStatus({
        loading: false,
        error: 'Please fill the email field.'
      })
    } else if (validateEmail(email)) {
      setStatus((status) => ({
        ...status,
        error: undefined
      }))
      return true
    } else {
      setStatus({
        loading: false,
        error: 'Kindly use a valid email address'
      })
    }

    return false
  }
  const onSubmit = async () => {
    const isValidContent = isValid()
    if (!isValidContent) {
      return
    }

    setStatus({ loading: true })

    const response = await submitWorkatoForm('serviceUnavailableCountry', {
      email: email as string
    })
    const userId = response?.cloudId ? response.cloudId : email

    openSnackBar(successMsg, 'success')
    setEmail(undefined)
    setTimeout(() => {
      setStatus({ loading: false })
    }, 5000)
  }

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  return (
    <>
      <SuiTextField
        htmlFor='email'
        label={emailLabel}
        name='email'
        type='email'
        value={email ?? ''}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={() => isValid()}
        error={status?.error}
        className='w-full text-left'
      />
      <div className='bottom'>
        {children}
        <SuiButton
          type='primary'
          disabled={status.loading || (email ?? '').length === 0}
          className='mx-auto w-full max-w-xs'
          onClick={onSubmit}>
          {btnText}
        </SuiButton>
      </div>
    </>
  )
}

export default ServiceUnavailableForm
