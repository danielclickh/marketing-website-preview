import { Fragment, ReactElement } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { SuiTitle } from '../typography'
import { SuiHorizontalDivide } from '../horizontal_divide'

type Props = {
  open: boolean
  close: any
  title: string
  fixedHeader?: boolean
  children: ReactElement
}

export function SuiFlyout(props: Props) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 overflow-hidden'
        onClose={props.close}>
        <div className='absolute inset-0 overflow-hidden'>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='absolute inset-0 bg-dark-grey3 bg-opacity-50 transition-opacity' />
          </Transition.Child>

          <div
            className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ${
              props.fixedHeader && 'pt-16'
            }`}>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'>
              <div className='pointer-events-auto w-screen max-w-md'>
                <div className='flex h-full flex-col overflow-y-scroll bg-light-grey1 dark:bg-dark-grey4 py-6 shadow-xl'>
                  <div className='px-4 sm:px-6'>
                    <div className='flex items-center justify-between'>
                      <SuiTitle size='lg'>{props.title}</SuiTitle>
                      <button
                        type='button'
                        className='rounded-md bg-light-grey-1  text-text-darkest dark:text-text-light hover:text-text-dark hover:dark:text-text-lightest'
                        onClick={props.close}>
                        <span className='sr-only'>Close panel</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                    <SuiHorizontalDivide />
                  </div>
                  <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                    {props.children}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
