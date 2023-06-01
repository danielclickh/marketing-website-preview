import { SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import GrowingCommunity from '../../../components/GrowingCommunity'
import Markdown from '../../../components/Markdown'
import { GetStaticProps } from 'next'
import { ContactProps } from '../../../types/contact'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import HRSeparator from '../../../components/HRSeparator'
import styles from './Contact.module.scss'
import useMarketo from './useMarketo'
import { useState } from 'react'

interface FormProps {
  baseUrl: string
  munchkinId: string
  formId: string
  callback: () => void
}

function Form(props: FormProps) {
  const { baseUrl, munchkinId, formId } = props
  if (!(baseUrl && munchkinId && formId)) {
    return <div>Fill the fields and a form should appear</div>
  }

  useMarketo(props)

  return <form id={`mktoForm_${formId}`} />
}

export const getStaticProps: GetStaticProps<ContactProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    return {
      props: {
        ...data.hero,
        seo: {
          title: 'Dedicated Services - ClickHouse',
          description:
            'Thank you for your interest in our Dedicated Service; please submit the below information to the best of your ability so we can help.'
        },
        ...commonProps
      }
    }
  }

interface ContactPageProps {
  contactForm: {
    disclaimer: string
  }
  footerData: ContactProps['footerData']
  headerData: ContactProps['headerData']
  seo: ContactProps['seo']
}

declare const mktoForms2BaseStyle: any
declare const mktoForms2ThemeStyle: any

/**
 * @author Sanford Whiteman
 * @version v1.104
 * @license MIT License: This license must appear with all reproductions of this software.
 *
 * Create a completely barebones, user-styles-only Marketo form
 * by removing inline STYLE attributes and disabling STYLE and LINK elements
 */
function destyleMktoForm(mktoForm: any, moreStyles?: boolean): void {
  const formEl: HTMLElement = mktoForm.getFormElem()[0]
  const arrayify: Function = Array.prototype.slice.call.bind(
    Array.prototype.slice
  )

  // remove element styles from <form> and children
  const styledEls: HTMLElement[] = arrayify(
    formEl.querySelectorAll('[style]')
  ).concat(formEl)
  styledEls.forEach((el: HTMLElement) => {
    el.removeAttribute('style')
  })

  // disable remote stylesheets and local <style>s
  const styleSheets: StyleSheet[] = Array.from(document.styleSheets)

  styleSheets.forEach((ss: StyleSheet) => {
    const ownerNode = ss.ownerNode as HTMLElement
    if (
      (typeof mktoForms2BaseStyle !== 'undefined' &&
        ownerNode === mktoForms2BaseStyle) ||
      (typeof mktoForms2ThemeStyle !== 'undefined' &&
        ownerNode === mktoForms2ThemeStyle) ||
      formEl.contains(ownerNode)
    ) {
      ss.disabled = true
    }
  })

  if (!moreStyles) {
    formEl.setAttribute('data-styles-ready', 'true')
    console.log('Styles ready at: ' + performance.now())
  }
}

export default function ContactPage({
  contactForm,
  footerData,
  headerData,
  seo
}: ContactPageProps) {
  const [inputs, setInputs] = useState<FormProps>({
    baseUrl: '//discover.clickhouse.com',
    munchkinId: '238-FPC-317',
    formId: '1043',
    callback: () => {
      // Declare FormsPlus object
      const FormsPlus = (window as any).FormsPlus || {
        allDescriptors: {},
        allMessages: {},
        detours: {}
      }
      FormsPlus.tagWrappers = function tagWrappers() {
        let ANCESTORS_STOR = '.mktoFormRow, .mktoFormCol'
        let INPUTS_STOR =
          'INPUT,SELECT,TEXTAREA,BUTTON,[data-name],.mktoPlaceholder,LEGEND'
        let attrTag = 'data-wrapper-for'
        let attrDone = 'data-initial-wrapper-tagging-complete'
        let placeholderPrefix = 'mktoPlaceholder'
        let arrayify = getSelection.call.bind([].slice) as any

        function tagMktoWrappers(formEl: HTMLFormElement) {
          const ancestors = arrayify(
            formEl.querySelectorAll(ANCESTORS_STOR)
          ) as NodeListOf<Element>
          ancestors.forEach(function (ancestor) {
            ancestor.setAttribute(attrTag, '')
            arrayify(ancestor.querySelectorAll(INPUTS_STOR)).forEach(function (
              input: HTMLFormElement
            ) {
              let currentTag = ancestor.getAttribute(attrTag)
              ancestor.setAttribute(
                attrTag,
                [
                  currentTag ? currentTag : '',
                  input.id,
                  input.name != input.id ? input.name : '',
                  input.getAttribute('data-name'),
                  input.nodeName == 'LEGEND' ? input.textContent : '',
                  arrayify(input.classList)
                    .filter(function (cls: HTMLFormElement) {
                      return cls.indexOf(placeholderPrefix) == 0
                    })
                    .map(function (cls: HTMLFormElement) {
                      ancestor.classList.add(placeholderPrefix)
                      return cls.replace(placeholderPrefix, '', 0)
                    })
                    .join(' ')
                ]
                  .join(' ')
                  .trim()
              )
            })
          })
        }

        ;(window as any).MktoForms2.whenRendered(function (form: any) {
          destyleMktoForm(form)
          let formEl = form.getFormElem()[0]
          tagMktoWrappers(formEl)
          formEl.setAttribute(attrDone, 'true')
          form.onSuccess(function () {
            // Get the form's jQuery element and hide it
            form.getFormElem().hide()
            document
              .querySelector('.success-message')
              ?.classList.remove('hidden')
            document.querySelector('#pricing-contact-form')?.scrollIntoView()
            // Return false to prevent the submission handler from taking the lead to the follow up url
            return false
          })
        })
      }

      FormsPlus.tagWrappers()
    }
  })

  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()

    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='pt-10'>
          <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
            <div
              className='mx-auto flex flex-col pt-6 text-center'
              id='pricing-contact-form'>
              <SuiTitle type='h1' className='mb-4'>
                Dedicated Service Form
              </SuiTitle>
              <div className='max-w-3xl text-neutral-200'>
                Thank you for your interest in our Dedicated Service; please
                submit the below information to the best of your ability so we
                can help.
              </div>
            </div>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 pt-14 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
              <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
                <div className='success-message hidden'>
                  <h3 className='text-center text-2xl font-bold'>
                    Thank you for your submission!
                  </h3>
                  <p className='mt-2 text-center text-neutral-200'>
                    We will be in touch soon.
                  </p>
                </div>
                <div className={styles.mktoFormContainer}>
                  <Form {...inputs} />
                </div>
                <div className='flex text-center'>
                  <div className='disclaimer-text text-sm font-medium text-neutral-200'>
                    <Markdown>{contactForm.disclaimer}</Markdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HRSeparator className='my-24' />
        <GrowingCommunity />
      </Layout>
    </>
  )
}
