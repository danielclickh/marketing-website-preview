import { SuiTitle } from '../../sui'
import styles from './styles.module.scss'
import { StrapiImageType } from '@/lib/api/strapi/types'
import { Disclosure, Transition } from '@headlessui/react'
import Image from 'next/image'
import { CSSProperties } from 'react'
import ReactMarkdown from 'react-markdown'

const style = {
  '--top-side': '224px'
} as CSSProperties

interface Item {
  name?: string
  description?: string
  href?: string
  icon?: StrapiImageType | string
}

interface AccordionComponentProps {
  icon?: string
  title?: string
  description?: string
  items?: Array<Item>
  askUsAnything?: string
  numbered: boolean
}

export default function AccordionComponent({
  items,
  title,
  description,
  icon,
  askUsAnything,
  numbered
}: AccordionComponentProps) {
  return (
    <div
      className='bg-shadow-element relative mx-auto mb-20 max-w-7xl items-center px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
      style={style}>
      <div className='pb-10 text-center'>
        <Image
          src={`${icon ? icon : '/faq-icon.svg'}`}
          alt='FAQ Icon'
          width={72}
          height={72}
          className='mx-auto lg:mx-0'
        />
        <SuiTitle type='h2' className='my-6 lg:text-left'>
          {title ? title : 'FAQs'}
        </SuiTitle>
        <div className='mx-auto max-w-md text-neutral-200 lg:text-left'>
          {description && description}
        </div>
      </div>
      <div className={`${styles.accordionContainer}`}>
        {items?.map((faq, index) => (
          <Disclosure
            as='div'
            className={styles.accordion}
            key={`faq-${index}`}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`${
                    numbered && styles.numbered
                  } relative z-10 grid w-full grid-cols-[1fr_1rem] items-center justify-between gap-x-6 rounded-lg p-4 pl-20 pr-6 text-left font-medium text-neutral-200 hover:text-neutral-0 focus:outline-none`}>
                  {!numbered && (
                    <div className='absolute left-0 w-16 border-r border-neutral-700/80 text-left text-neutral-300/60'>
                      <Image
                        src={
                          typeof faq.icon === 'string'
                            ? faq.icon
                            : faq.icon?.url || '/faq-icon.svg'
                        }
                        width={32}
                        height={32}
                        alt={faq.name as string}
                        className='mx-auto'
                      />
                    </div>
                  )}
                  <span className='text-md'>{faq.name}</span>
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
                    className={`home-faqs pb-4 pl-20 pr-4 text-sm text-neutral-200 transition-opacity duration-100 ${
                      open ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <div className=''>
                      <ReactMarkdown>{faq.description as string}</ReactMarkdown>
                    </div>
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
