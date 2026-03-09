import styles from './styles.module.scss'
import CopyUrlButton from '@/components/CopyUrlButton'
import FontSohneBreit from '@/components/FontSohneBreit'
import MarketoForm from '@/components/MarketoForm'
import SocialButton from '@/components/SocialButton'
import { useClickOutside } from '@/hooks'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

export interface OpenhouseFormModalProps {
  formId: string
  open: boolean
  onClose(): void
}

export default function OpenhouseFormModal({
  formId,
  open,
  onClose
}: OpenhouseFormModalProps) {
  const formModalRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  useClickOutside(formModalRef, onClose)

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-y-auto sm:p-6 ${styles.modalBackground} ${open ? 'block' : 'hidden'}`}>
      <div
        className='mx-auto min-h-dvh max-w-2xl bg-white p-6 text-black sm:min-h-0'
        ref={formModalRef}>
        {!formSuccess && (
          <>
            <div className='mb-6 flex items-center justify-between'>
              <FontSohneBreit className='flex-1 text-3xl font-black'>
                Get your ticket
              </FontSohneBreit>

              <button
                onClick={(event) => {
                  event.preventDefault()
                  onClose()
                }}
                className='flex aspect-square w-8 flex-shrink-0 flex-grow-0 items-center justify-center gap-1 text-center text-neutral-500 transition-colors hover:bg-neutral-400/10'>
                <X height={24} />
                <span className='sr-only'>Close</span>
              </button>
            </div>
            <MarketoForm
              theme='light'
              formId={formId}
              clearbitTracking={true}
              onLoad={() => setFormLoaded(true)}
              onSuccess={() => {
                setFormSuccess(true)
                return false // Stops page from reloading
              }}
              disclaimer={
                <>
                  By registering, you acknowledge that ClickHouse will process
                  your personal information in accordance with our{' '}
                  <Link href='/legal/privacy-policy' className='underline'>
                    Privacy Policy
                  </Link>
                  .
                </>
              }
            />
          </>
        )}
        {!formLoaded && (
          <div className='mb-12 mt-10 text-center'>Loading form...</div>
        )}

        {formSuccess && (
          <div className='my-auto flex flex-col items-center py-6 text-center lg:py-10'>
            <svg
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M24 48.0091V48.0091C10.744 48.0091 0 37.2651 0 24.0091V24.0091C0 10.7531 10.744 0.00909424 24 0.00909424V0.00909424C37.256 0.00909424 48 10.7531 48 24.0091V24.0091C48 37.2651 37.256 48.0091 24 48.0091Z'
                fill='#EBFF00'
              />
              <path
                d='M34.6666 18.6758L21.3333 32.0091L13.3333 24.0091'
                stroke='black'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <p className='mt-6 text-xl font-bold'>
              Thanks for your interest in Open House.
              <br />
              Check your email for next steps.
            </p>
            <p className='mb-3 mt-12 text-center font-bold text-neutral-400'>
              Share this event
            </p>
            <div className='flex flex-wrap justify-center gap-2 text-neutral-0'>
              <CopyUrlButton className='flex aspect-square w-11 items-center justify-center !rounded-none !p-0 !shadow-none hover:!bg-ch-yellow' />
              <SocialButton
                className='flex aspect-square w-11 items-center justify-center !rounded-none !p-0 !shadow-none hover:!bg-ch-yellow'
                type='y_combinator'
                title='Open House by ClickHouse'
              />
              <SocialButton
                className='flex aspect-square w-11 items-center justify-center !rounded-none !p-0 !shadow-none hover:!bg-ch-yellow'
                type='twitter'
                title='Open House by ClickHouse'
              />
              <SocialButton
                className='flex aspect-square w-11 items-center justify-center !rounded-none !p-0 !shadow-none hover:!bg-ch-yellow'
                type='facebook'
                title='Open House by ClickHouse'
              />
              <SocialButton
                className='flex aspect-square w-11 items-center justify-center !rounded-none !p-0 !shadow-none hover:!bg-ch-yellow'
                type='linkedin'
                title='Open House by ClickHouse'
              />
            </div>
            <button
              onClick={(event) => {
                event.preventDefault()
                onClose()
              }}
              className='mt-12 flex items-center gap-1 border border-neutral-400 py-1 pl-1 pr-3 text-center text-neutral-500 transition-colors hover:bg-neutral-400/10'>
              <X height={16} />
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
