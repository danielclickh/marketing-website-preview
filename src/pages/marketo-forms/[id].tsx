import tailwindConfig from '../../../tailwind.config'
import styles from './styles.module.scss'
import { getUTMsFromStorage } from '@/components/UTMPersist'
import { slugify } from '@/lib/utils/strings'
import { MarketoFormObject, MarketoFormsApi } from '@/types/marketo-form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

// Get the medium breakpoint from the tailwind config incase the value is changed
const resolvedConfig = resolveConfig(tailwindConfig as any)
const formBreakpoint = parseInt(resolvedConfig.theme?.screens?.md || '768px')

const BASE_URL = '//discover.clickhouse.com'
const MUNCHKIN_ID = '238-FPC-317'

interface QueryObject {
  [key: string]: string | string[] | undefined
}

declare global {
  interface Window {
    MktoForms2: MarketoFormsApi
  }
}

export default function Page() {
  const router = useRouter()

  const [formId, setFormId] = useState<string>('')
  const [instanceId, setInstanceId] = useState<null | string>(null)
  const [clearbitTracking, setClearbitTracking] = useState<boolean>(false)
  const [submitButtonLabel, setSubmitButtonLabel] = useState<null | string>(
    null
  )
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [referer, setReferer] = useState<null | string>(null)
  const [refererClass, setRefererClass] = useState<string>('')

  // Prefix events so the parent can identify events from multiple forms iframes
  const instanceEventPrefix = () => {
    return ['mkto', instanceId, formId].filter((val) => !!val).join('-')
  }

  const formRef = useRef<HTMLFormElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [routerReady, setRouterReady] = useState(false)

  function sendEventToParent(eventName: string, data: any = null) {
    if (window?.parent) {
      window.parent.postMessage({
        type: `${instanceEventPrefix()}-${eventName}`,
        data: data
      })
      return true
    }

    return false
  }

  function sendResizeEvent() {
    sendEventToParent('onResize', {
      width: document.documentElement.offsetWidth,
      height: document.documentElement.offsetHeight,
      scrollHeight: document.documentElement.scrollHeight
    })
  }

  function recieveEventFromParent({ data }: MessageEvent) {
    if (typeof data === 'object' && 'type' in data && 'data' in data) {
      const eventType = data.type
      const eventData = data.data

      switch (eventType) {
        // Trigger events
        case `${instanceEventPrefix()}-submit`:
          window.MktoForms2?.getForm(formId)?.submit()
          break
        case `${instanceEventPrefix()}-setValues`:
          window.MktoForms2?.getForm(formId)?.setValues(eventData)
          break
        case `${instanceEventPrefix()}-addHiddenFields`:
          window.MktoForms2?.getForm(formId)?.addHiddenFields(eventData)
          break
        case `${instanceEventPrefix()}-showErrorMessage`:
          window.MktoForms2?.getForm(formId)?.showErrorMessage(eventData)
          break

        // Getter events
        case `${instanceEventPrefix()}-validate`:
          sendEventToParent(
            'validate',
            window.MktoForms2?.getForm(formId)?.validate()
          )
          break
        case `${instanceEventPrefix()}-getValues`:
          sendEventToParent(
            'getValues',
            window.MktoForms2?.getForm(formId)?.getValues()
          )
          break

        case `${instanceEventPrefix()}-submittable`:
          sendEventToParent(
            'submittable',
            window.MktoForms2?.getForm(formId)?.submittable(eventData)
          )
          break

        case `${instanceEventPrefix()}-allFieldsFilled`:
          sendEventToParent(
            'allFieldsFilled',
            window.MktoForms2?.getForm(formId)?.allFieldsFilled()
          )
          break
      }
    }
  }

  const [resizeObserver, setResizeObserver] = useState<null | ResizeObserver>(
    null
  )

  const resizeRef = useCallback(
    (node: HTMLDivElement) => {
      if (node && resizeObserver) resizeObserver.observe(node)
    },
    [resizeObserver]
  )

  // 1. Watch for when router is ready
  useEffect(() => {
    if (router.isReady) setRouterReady(true)
  }, [router])

  // 2. Hide unwanted UI stuffs
  useEffect(() => {
    // Make document transparent
    document.querySelector('html')?.classList.add('!bg-transparent', '!bg-none')
    document.querySelector('body')?.classList.add('!bg-transparent', '!bg-none')
    document
      .querySelector('body main > .min-h-screen')
      ?.classList.remove('min-h-screen')

    // Hide cookie banner
    const cookieBannerInterval = window.setInterval(() => {
      const cookieBanner = document.querySelector<HTMLDivElement>('.cc-window')
      if (cookieBanner) {
        window.clearInterval(cookieBannerInterval)
        cookieBanner.classList.add('!hidden')
        cookieBanner.style.display = 'none'
      }
    }, 500)
  }, [])

  // 3. Get query params and load external scripts
  useEffect(() => {
    if (routerReady) {
      // Component options from iframe query string
      setFormId(router.query.id as string)
      setInstanceId((router.query?.iid as string) || '')
      setClearbitTracking(router.query?.clearbitTracking === '1')
      setSubmitButtonLabel((router.query?.submitButtonLabel as string) || null)
      setReferer((router.query?.referer as string) || null)

      if (router.query?.theme === 'dark' || router.query?.theme === 'light') {
        setTheme(router.query.theme)
      }

      // Add column classes classes
      const addColumnClasses = () => {
        if (formRef.current) {
          if (window.parent.innerWidth >= formBreakpoint) {
            formRef.current.classList.add('allow-columns')
          } else {
            formRef.current.classList.remove('allow-columns')
          }
        }
      }
      window.addEventListener('resize', addColumnClasses)
      addColumnClasses()

      // Add marketo script
      const script = document.createElement('script')
      script.src = `${BASE_URL}/js/forms2/js/forms2.min.js`
      script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null)
      document.body.appendChild(script)

      // Clean up on unmount
      return () => {
        window.removeEventListener('resize', addColumnClasses)
        script.remove()
      }
    }
  }, [routerReady])

  // 4. Call Marketo JS API
  useEffect(() => {
    // Watch the dom for resizing
    const observer = new ResizeObserver(() => {
      sendEventToParent('onResize', {
        width: document.documentElement.offsetWidth,
        height: document.documentElement.offsetHeight,
        scrollHeight: document.documentElement.scrollHeight
      })
    })
    setResizeObserver(observer)

    setRefererClass(`referer-${slugify(getRefererPath(referer, 'unknown'))}`)

    // Handle Marketo form creation
    if (routerReady && scriptLoaded) {
      // Empty form contents in case of rerender
      if (formRef.current) formRef.current.innerHTML = ''

      // Fixes marketo referrer issue for SPAs
      window.MktoForms2.whenReady((marketoFormObject) => {
        fixMarketoReferer(marketoFormObject, referer)
      })

      // Remove styles unwanted styles on re-render
      window.MktoForms2.onFormRender((marketoFormObject) => {
        removeMarketoStyles(marketoFormObject)

        // Update submit button label from iframe query params
        if (submitButtonLabel)
          setMarketoSubmitButtonLabel(marketoFormObject, submitButtonLabel)
      })

      // Init the marketo JS api
      window.MktoForms2.loadForm(
        BASE_URL,
        MUNCHKIN_ID,
        formId,
        function (marketoFormObject) {
          // Remove marketo added styles
          removeMarketoStyles(marketoFormObject)

          // Update submit button label from iframe query params
          if (submitButtonLabel)
            setMarketoSubmitButtonLabel(marketoFormObject, submitButtonLabel)

          // Add clearbit tracking script
          if (clearbitTracking) {
            const script = document.createElement('script')
            script.src =
              'https://marketo.clearbit.com/assets/v1/marketo/forms.js'
            script.async = true
            script.setAttribute(
              'data-clearbit-publishable-key',
              'pk_25c26e54fda4158b4189447198378375'
            )
            script.onerror = function (e) {
              marketoFormObject.setValues({
                clearbitFormStatus: 'Clearbit Form JS unable to load'
              })
            }

            document.querySelector('head')?.appendChild(script)
          }

          //UTM persistence -
          /*
            First we need to check if there's UTMs passed - queryUtmFields - in the URL already. If there are, we can ignore persistence as we only want the latest UTMs that drove a submission.
          */
          const utmFieldMapping: Record<string, string> = {
            utm_campaign: 'utm_campaign__c',
            utm_content: 'utm_content__c',
            utm_medium: 'utm_medium__c',
            utm_source: 'utm_source__c',
            utm_term: 'utm_term__c',
            gclid: 'gclid__c'
          }

          const checkUtmFields = (query: QueryObject): boolean => {
            return Object.keys(utmFieldMapping).some((field) => field in query)
          }

          //if no utms are already present in the URL, continue, and check if the form has the values already
          if (!checkUtmFields(router.query)) {
            // Fields are prepped, let's check local storage
            const utmsInStorage = getUTMsFromStorage()
            if (utmsInStorage) {
              for (const key in utmsInStorage) {
                if (utmsInStorage.hasOwnProperty(key)) {
                  // Get the mapped field name
                  const mappedField = utmFieldMapping[key]
                  if (mappedField && typeof utmsInStorage[key] === 'string') {
                    // Update the form with the value from storage
                    marketoFormObject.addHiddenFields({
                      [mappedField]: utmsInStorage[key] as string
                    })
                  }
                }
              }
            }
          }

          // Send form loaded event
          sendEventToParent('onLoad')

          // Send validation event
          marketoFormObject.onValidate((isValid) => {
            sendEventToParent('onValidate', isValid)
          })

          // Send submit event
          marketoFormObject.onSubmit(() => {
            sendEventToParent('onSubmit')
          })

          // Prevent redirection
          marketoFormObject.onSuccess((values, redirect) => {
            sendEventToParent('onSuccess', { values, redirect })
            return false
          })

          // Handle custom email validation
          if (formId === '1274') {
            marketoFormObject.onValidate(() => {
              const vals = marketoFormObject.vals()
              if (vals && vals?.Email) {
                const lowerEmail = vals.Email.toLowerCase()
                //filthy but works for now
                if (
                  lowerEmail.includes('@googlemail.com') ||
                  lowerEmail.includes('@gmail.com') ||
                  lowerEmail.includes('@hotmail.com') ||
                  lowerEmail.includes('@yahoo.com') ||
                  lowerEmail.includes('@outlook.com') ||
                  lowerEmail.includes('@live.com') ||
                  lowerEmail.includes('@icloud.com')
                ) {
                  marketoFormObject.showErrorMessage(
                    'Please enter a business email to continue.',
                    marketoFormObject.getFormElem().find('#Email')
                  )
                  marketoFormObject.submittable(false)
                } else {
                  marketoFormObject.submittable(true)
                }
              }
            })
          }

          // Listen for events from the parent
          window.addEventListener('message', recieveEventFromParent)
        }
      )

      // Clean-up on unmount
      return () => {
        if (formRef.current) formRef.current.innerHTML = ''
        observer.disconnect()
        window.removeEventListener('message', recieveEventFromParent)
      }
    }
  }, [
    routerReady,
    scriptLoaded,
    formId,
    instanceId,
    clearbitTracking,
    submitButtonLabel,
    referer
  ])

  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <div ref={resizeRef} className={styles.marketoFormContainerV2}>
        <form
          className={`mktoForm theme-${theme} ${refererClass}`}
          id={`mktoForm_${formId}`}
          ref={formRef}
        />
      </div>
    </>
  )
}

function setMarketoSubmitButtonLabel(
  marketoFormObject: MarketoFormObject,
  label: string
) {
  const jqueryElement = marketoFormObject.getFormElem()
  jqueryElement.find('.mktoButtonRow button[type="submit"]').text(label)
}

function removeMarketoStyles(marketoFormObject: MarketoFormObject) {
  const jqueryElement = marketoFormObject.getFormElem()
  const formElement = jqueryElement.get(0)

  // Remove marketo <link> styles
  const styleLinks = document.querySelectorAll(
    '#mktoForms2ThemeStyle, #mktoForms2BaseStyle'
  )
  Array.from(styleLinks).forEach((el) => el.remove())

  if (formElement) {
    // Remove fixed widths for improved responsiveness
    const fixedWidths =
      formElement.querySelectorAll<HTMLElement>('.mktoHasWidth')
    Array.from(fixedWidths).forEach((el) => {
      el.classList.remove('mktoHasWidth')
      delete el.dataset.mktoFixedWidth
      el.removeAttribute('data-mktoFixedWidth') // Just incase ¯\_(ツ)_/¯
    })

    // Remove form <style> elements
    const scopedStyles = formElement.querySelectorAll('style')
    Array.from(scopedStyles).forEach((el) => {
      // Don't remove styles from html blocks
      if (!el.closest('.mktoHtmlText')) {
        el.remove()
      }
    })

    // Remove inline style attributes
    const inlineStyles = formElement.querySelectorAll('[style]')
    Array.from(inlineStyles).forEach((el) => {
      // Don't remove styles from html blocks
      if (!el.closest('.mktoHtmlText')) {
        el.removeAttribute('style')
      }
    })

    // Remove inline style from <form> element
    formElement.removeAttribute('style')
  }
}

function getReferer(value: null | string = null) {
  if (value && value.length) return value
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return window.location !== window.parent.location
      ? document.referrer
      : document.location.href
  }
  return ''
}

function getRefererPath(
  value: null | string = null,
  defaultValue: any = null
): string | any {
  const fixed = getReferer(value)
  if (!fixed.length) return defaultValue
  try {
    return new URL(fixed).pathname
  } catch (e) {}
  return defaultValue
}

// @link https://blog.teknkl.com/fix-forms-20-referrer-cached-single-page-application/
function fixMarketoReferer(
  marketoFormObject: MarketoFormObject,
  referer?: null | string
) {
  const nativeGetValues = marketoFormObject.getValues
  marketoFormObject.onSubmit(function (submittingForm) {
    submittingForm.getValues = function () {
      const values = nativeGetValues()
      Object.defineProperty(values, '_mktoReferrer', {
        value: getReferer(referer),
        enumerable: true
      })
      return values
    }
  })
}
