import { CUILink } from '../ClickUI'
import { SuiTitle } from '../sui'
import styles from './styles.module.scss'
import { FullyQualifiedEvent } from '@/lib/galaxy/client'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { Disclosure, Transition } from '@headlessui/react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { CSSProperties } from 'react'
import ReactMarkdown from 'react-markdown'

const style = {
  '--top-side': '224px'
} as CSSProperties

export default function FAQDynamic({
  title = 'FAQs',
  description = 'Wherever you need us, we’re there. We love to engage in thoughtful conversation with the ClickHouse community and are always on-hand to answer your questions.',
  askUsAnything = false,
  faqs
}: {
  title?: string
  description?: string
  askUsAnything: boolean
  faqs: {
    title: string
    content: string
    event: string
  }[]
}) {
  const handleAskAnythingClick = useGalaxyOnClick(
    'homePage.faqSection.askAnythingSelect'
  )

  return (
    <div
      className='bg-shadow-element relative mx-auto mb-20 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
      style={style}>
      <div className='pb-10 text-center'>
        <Image
          src='/faq-icon.svg'
          alt='FAQ Icon'
          width={72}
          height={72}
          className='mx-auto lg:mx-0'
        />
        <SuiTitle type='h2' className='my-6 lg:text-left'>
          {title}
        </SuiTitle>
        <div className='mx-auto max-w-md text-neutral-200 lg:text-left'>
          {description}
        </div>
        {askUsAnything && (
          <CUILink
            href='/support/program/'
            target='_self'
            className='mt-6 flex items-center justify-center gap-4 text-primary lg:justify-start'
            onClick={handleAskAnythingClick}>
            <span>Ask us anything</span>{' '}
            <ExternalLinkIcon className='h-4 w-4' />
          </CUILink>
        )}
      </div>
      <div className={styles.accordionContainer}>
        {faqs.map((faq, index) => (
          <Disclosure
            as='div'
            className={styles.accordion}
            key={`faq-${index}`}>
            {({ open }) => (
              <>
                <div
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  onClick={useGalaxyOnClick(faq.event as FullyQualifiedEvent)}>
                  <Disclosure.Button className='relative z-10 grid w-full grid-cols-[1fr_1rem] items-center justify-between gap-x-6 rounded-lg p-4 pl-20 pr-6 text-left font-medium text-neutral-200 hover:text-neutral-0 focus:outline-none'>
                    <span className='text-md'>{faq.title}</span>
                    <span className={styles.plusMinus} data-active={open} />
                  </Disclosure.Button>
                </div>
                <Transition
                  show={open}
                  className='h-full'
                  enter='transition-[max-height] duration-300 ease-in-out'
                  enterFrom='max-h-0 opacity-0'
                  enterTo='max-h-fit opacity-100'
                  leave='transition-[max-height] duration-300 ease-in-out'
                  leaveFrom='max-h-fit opacity-100'
                  leaveTo='max-h-0 opacity-0'>
                  <Disclosure.Panel
                    className={`home-faqs pb-4 pl-20 pr-4 text-sm text-neutral-200 transition-opacity duration-100 ${
                      open ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <ReactMarkdown>{faq.content}</ReactMarkdown>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}
