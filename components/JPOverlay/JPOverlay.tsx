import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'

export default function JpOverlay() {
  const [open, setOpen] = useState(true)
  const [isJapaneseUser, setIsJapaneseUser] = useState(false)

  const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  useEffect(() => {
    // Check if the user dismissed the dialog previously
    const hasDismissedDialog = document.cookie.includes(
      'dismissedJPDialog=true'
    )

    if (!hasDismissedDialog) {
      fetch('https://ipinfo.io?token=33cfa2cb7f422c')
        .then((response) => response.json())
        .then((data) => {
          const countryCode = data.country
          setIsJapaneseUser(countryCode === 'GB')
        })
        .catch(() => {
          // Check if the user's language indicates Japanese
          setIsJapaneseUser(navigator.language.startsWith('ja'))
        })
    } else {
      setOpen(false)
    }
  }, [])

  const handleDismiss = () => {
    // Set a cookie to remember that the user dismissed the dialog
    document.cookie = `dismissedJPDialog=true; expires=${expirationDate.toUTCString()}; path=/`
    setOpen(false)
  }

  //Render the component only for Japanese users
  if (!isJapaneseUser) {
    return null // Don't render the component for non-Japanese users
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-[50]' onClose={handleDismiss}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 z-[50] w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Tilt
              tiltEnable={false}
              glareEnable={true}
              glareMaxOpacity={0.4}
              glareColor='rgba(251, 255, 70, 0.08)'
              glarePosition='all'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                  <div>
                    <div className='absolute right-0 top-0 hidden pr-4 pt-4 sm:block'>
                      <button
                        type='button'
                        className='rounded-md  text-neutral-0 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={handleDismiss}>
                        <span className='sr-only'>Close</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                    <div className='mt-3 text-center sm:mt-10'>
                      <Dialog.Title
                        as='h2'
                        className='text-lg font-semibold leading-6 text-neutral-0'>
                        ClickHouse (クリックハウス)
                        <br />
                        Meetup Tokyo
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-neutral-0'>
                          ClickHouseコミュニティミートアップを東京で開催することをお知らせいたします。ClickHouseの魅力に触れる貴重な機会をお見逃しなく！
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <a
                      id='alicloud-button'
                      onClick={handleDismiss}
                      target='_blank'
                      href='https://www.meetup.com/clickhouse-tokyo-user-group/events/300798053/'
                      className='flex h-12 w-full items-center justify-center  gap-1 rounded border border-primary-300 bg-primary-300 px-4 text-center text-base font-semibold text-neutral-900 hover:bg-primary-400'>
                      登録する
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </Tilt>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
