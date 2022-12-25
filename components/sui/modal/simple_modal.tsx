import { Fragment, ReactElement } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { SuiTitle } from '../typography'
import { SuiHorizontalDivide } from '../horizontal_divide'
import { SuiButton } from '../buttons/button'

type Props = {
  open: boolean
  close: any
  closeBtnText?: string
  title: string
  children: ReactElement
  sidebar?: boolean
  sidebarChildren?: ReactElement
  actionButtonChildren?: ReactElement
}

export function SuiSimpleModal(props: Props) {
  const closeButtonText = props.closeBtnText ? props.closeBtnText : 'Close'
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={props.close}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-dark-grey3 bg-opacity-50 backdrop-blur-sm transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
            <div className='relative inline-block align-bottom bg-white dark:bg-dark-grey4 rounded-lg text-left overflow-hidden shadow-xl dark:shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-3xl'>
              <div className='flex justify-between'>
                <div className='flex flex-col w-full'>
                  <div className='px-8 pt-5 pb-4 sm:p-6 md:px-8 sm:pb-4'>
                    <div className='flex justify-between items-center'>
                      <SuiTitle type='h3' className='w-full pt-4 pb-2'>
                        {props.title}
                      </SuiTitle>
                      {props.sidebar !== true && (
                        <button
                          type='button'
                          className='rounded-md text-text-dark hover:text-text-darkest dark:text-text-light hover:dark:text-white'
                          onClick={props.close}>
                          <span className='sr-only'>Close panel</span>
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      )}
                    </div>
                    <SuiHorizontalDivide />
                    <div className='mt-6'>{props.children}</div>
                  </div>
                  <div className='mb-2 py-3 mr-4 flex flew-grow-0 sm:flex sm:flex-row-reverse md:px-42'>
                    {props.actionButtonChildren}
                    <div>
                      <SuiButton
                        color='empty'
                        onClick={props.close}
                        title={closeButtonText}
                      />
                    </div>
                  </div>
                </div>
                {props.sidebar && (
                  <div className='bg-light-grey2 dark:bg-dark-grey3 w-1/3 p-8'>
                    <div className='flex items-center justify-between border-b border-light-grey5 dark:border-dark-grey4 pb-4'>
                      <SuiTitle type='h6' className='pt-1' color='dark'>
                        Summary
                      </SuiTitle>
                      <button
                        type='button'
                        className='rounded-md text-text-dark hover:text-text-darkest dark:text-text-light hover:dark:text-white flex-row-reverse'
                        onClick={props.close}>
                        <span className='sr-only'>Close panel</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                    {props.sidebarChildren}
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
