import { Disclosure, Transition } from '@headlessui/react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { CUILink } from '../ClickUI'
import { SuiTitle } from '../sui'
import styles from './styles.module.scss'

export default function FAQ() {
  return (
    <div className='flex flex-col md:flex-row w-full px-4 2xl:px-0 pb-16 items-start md:items-center justify-center max-w-7xl mx-auto'>
      <div className='bg-shadow-element py-10 max-w-screen-sm mr-auto'>
        <Image src='/faq-icon.svg' alt='FAQ Icon' width={72} height={72} />
        <SuiTitle type='h2' className='my-6'>
          FAQs
        </SuiTitle>
        <div className='max-w-md'>
          Wherever you need us, we’re there. We love to engage in thoughtful
          conversation with the ClickHouse community and are always on-hand to
          answer your questions.{' '}
        </div>
        <CUILink
          href='/clickhouse'
          target='_self'
          className='flex gap-4 leading-normal text-primary items-center'>
          <span>Ask us anything</span> <ExternalLinkIcon className='w-4 h-4' />
        </CUILink>
      </div>
      <div className={styles.accordionContainer}>
        <Disclosure as='div' className={styles.accordion}>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg py-5 text-left text-sm font-medium text-neutral-0 focus:outline-none '>
                <span>
                  Is ClickHouse faster than SnowFlake/Redshift/DuckDB etc?
                </span>
                <span className={styles.plusMinus} data-active={open} />
              </Disclosure.Button>
              <Transition
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'>
                <Disclosure.Panel className='transition-all pt-4 pb-2 text-sm text-neutral-0'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                  Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                  Curabitur pellentesque nibh nibh, at maximus ante fermentum
                  sit amet. Pellentesque commodo lacus at sodales sodales.
                  Quisque sagittis orci ut diam condimentum, vel euismod erat
                  placerat. In iaculis arcu eros, eget tempus orci facilisis
                  id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  et massa mi.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Disclosure as='div' className={styles.accordion}>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg py-5 text-left text-sm font-medium text-neutral-0 focus:outline-none '>
                <span>
                  Can I use ClickHouse with Kafka/Airbyte/Amazon S3 etc?
                </span>
                <span className={styles.plusMinus} data-active={open} />
              </Disclosure.Button>
              <Disclosure.Panel className='pt-4 pb-2 text-sm text-neutral-0'>
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
        <Disclosure as='div' className={styles.accordion}>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg py-5 text-left text-sm font-medium text-neutral-0 focus:outline-none '>
                <span>What are the deployment options for ClickHouse?</span>
                <span className={styles.plusMinus} data-active={open} />
              </Disclosure.Button>
              <Disclosure.Panel className='pt-4 pb-2 text-sm text-neutral-0'>
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
        <Disclosure as='div' className={styles.accordion}>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg py-5 text-left text-sm font-medium text-neutral-0 focus:outline-none '>
                <span>How much does ClickHouse cost?</span>
                <span className={styles.plusMinus} data-active={open} />
              </Disclosure.Button>
              <Disclosure.Panel className='pt-4 pb-2 text-sm text-neutral-0'>
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
        <Disclosure as='div' className={styles.accordion}>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg py-5 text-left text-sm font-medium text-neutral-0 focus:outline-none '>
                <span>Can I see the benchmarks?</span>
                <span className={styles.plusMinus} data-active={open} />
              </Disclosure.Button>
              <Disclosure.Panel className='pt-4 pb-2 text-sm text-neutral-0'>
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
