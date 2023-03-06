import { Disclosure } from '@headlessui/react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { SuiLink } from '../sui'
import styles from './styles.module.scss'

export default function FAQ() {
  return (
    <div className='flex flex-col md:flex-row w-full px-4 pt-16'>
      <div>
        <h2>FAQs</h2>
        <div>
          Wherever you need us, we’re there. We love to engage in thoughtful
          conversation with the ClickHouse community and are always on-hand to
          answer your questions.{' '}
        </div>
        <SuiLink
          href='\clickhouse'
          target='_self'
          color='primary'
          weight='bold'
          className='flex gap-4'>
          Ask us anything <ExternalLinkIcon className='w-4 h-4' />
        </SuiLink>
      </div>
      <div className='mx-auto w-full max-w-md rounded-2xl p-2 flex flex-col gap-6'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg bg-noised px-4 py-2 text-left text-sm font-medium text-neutral-0 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                <span>
                  Is ClickHouse faster than SnowFlake/Redshift/DuckDB etc?
                </span>
                <span className={styles.plusMinus} data-active={open} />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-neutral-0'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                amet. Pellentesque commodo lacus at sodales sodales. Quisque
                sagittis orci ut diam condimentum, vel euismod erat placerat. In
                iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as='div'>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg bg-noised px-4 py-2 text-left text-sm font-medium text-neutral-0 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                <span>
                  Can I use ClickHouse with Kafka/Airbyte/Amazon S3 etc?
                </span>
                <span className={styles.plusMinus} data-active={open} />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-neutral-0'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                amet. Pellentesque commodo lacus at sodales sodales. Quisque
                sagittis orci ut diam condimentum, vel euismod erat placerat. In
                iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as='div'>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg bg-noised px-4 py-2 text-left text-sm font-medium text-neutral-0 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                <span>
                  Can I use ClickHouse with Kafka/Airbyte/Amazon S3 etc?
                </span>
                <span className={styles.plusMinus} data-active={open} />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-neutral-0'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                amet. Pellentesque commodo lacus at sodales sodales. Quisque
                sagittis orci ut diam condimentum, vel euismod erat placerat. In
                iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
