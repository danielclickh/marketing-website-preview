import { Disclosure, Transition } from '@headlessui/react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { CUILink } from '../ClickUI'
import { SuiTitle } from '../sui'
import faqList from './faqList.json'
import styles from './styles.module.scss'
import ReactMarkdown from 'react-markdown'
import { CSSProperties } from 'react'

const style = {
  '--top-side': '224px'
} as CSSProperties

export default function FAQ() {
  return (
    <div
      className='relative bg-shadow-element flex flex-col md:flex-row w-full px-4 md:px-12 pb-24 items-start justify-center max-w-7xl mx-auto'
      style={style}>
      <div className='py-10 max-w-screen-sm mr-auto text-center md:text-left'>
        <Image
          src='/faq-icon.svg'
          alt='FAQ Icon'
          width={72}
          height={72}
          className='mx-auto md:mx-0'
        />
        <SuiTitle type='h2' className='my-6'>
          FAQs
        </SuiTitle>
        <div className='max-w-md text-neutral-200'>
          Wherever you need us, we’re there. We love to engage in thoughtful
          conversation with the ClickHouse community and are always on-hand to
          answer your questions.{' '}
        </div>
        <CUILink
          href='/support/program/'
          target='_self'
          className='flex gap-4 text-primary items-center mt-6'>
          <span>Ask us anything</span> <ExternalLinkIcon className='w-4 h-4' />
        </CUILink>
      </div>
      <div className={styles.accordionContainer}>
        {faqList.map((faq, index) => (
          <Disclosure
            as='div'
            className={styles.accordion}
            key={`faq-${index}`}>
            {({ open }) => (
              <>
                <Disclosure.Button className='relative z-10 flex p-4 pl-20 w-full justify-between items-center rounded-lg text-left font-medium text-neutral-200 hover:text-neutral-0 focus:outline-none'>
                  <span className='text-md'>{faq.title}</span>
                  <span className={styles.plusMinus} data-active={open} />
                </Disclosure.Button>
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
                    className={`transition-opacity duration-100 text-sm pl-20 pr-4 pb-4 text-neutral-200 home-faqs ${
                      open ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <ReactMarkdown children={faq.content} />
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
