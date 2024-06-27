import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'
import { MarketoFormObject, MarketoFormsApi } from '../../types/marketo-form'
import styles from './styles.module.scss'
import { getUTMsFromStorage } from '../../components/UTMPersist'

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
  const formId = typeof router.query?.id === 'string' ? router.query.id : ''

  // Component ID passed from parent
  const instanceId =
    typeof router.query?.iid === 'string' ? router.query.iid : ''

  const clearbitTracking =
    typeof router.query?.clearbitTracking === 'string' &&
    router.query.clearbitTracking === '1'

  // Referer URL passed from parent
  const referer =
    typeof router.query?.referer === 'string' ? router.query.referer : ''

  // Prefix events so the parent can identify events from multiple forms iframes
  const instanceEventPrefix = ['mkto', instanceId, formId]
    .filter((val) => !!val)
    .join('-')

  const formRef = useRef<HTMLFormElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [routerReady, setRouterReady] = useState(false)

  function sendEventToParent(eventName: string, data: any = null) {
    if (window?.parent) {
      window.parent.postMessage({
        type: `${instanceEventPrefix}-${eventName}`,
        data: data
      })
      return true
    }

    return false
  }

  function recieveEventFromParent({ data }: MessageEvent) {
    if (typeof data === 'object' && 'type' in data && 'data' in data) {
      const eventType = data.type
      const eventData = data.data

      switch (eventType) {
        // Trigger events
        case `${instanceEventPrefix}-submit`:
          window.MktoForms2?.getForm(formId)?.submit()
          break
        case `${instanceEventPrefix}-setValues`:
          window.MktoForms2?.getForm(formId)?.setValues(eventData)
          break
        case `${instanceEventPrefix}-addHiddenFields`:
          window.MktoForms2?.getForm(formId)?.addHiddenFields(eventData)
          break
        case `${instanceEventPrefix}-showErrorMessage`:
          window.MktoForms2?.getForm(formId)?.showErrorMessage(eventData)
          break

        // Getter events
        case `${instanceEventPrefix}-validate`:
          sendEventToParent(
            'validate',
            window.MktoForms2?.getForm(formId)?.validate()
          )
          break
        case `${instanceEventPrefix}-getValues`:
          sendEventToParent(
            'getValues',
            window.MktoForms2?.getForm(formId)?.getValues()
          )
          break

        case `${instanceEventPrefix}-submittable`:
          sendEventToParent(
            'submittable',
            window.MktoForms2?.getForm(formId)?.submittable(eventData)
          )
          break

        case `${instanceEventPrefix}-allFieldsFilled`:
          sendEventToParent(
            'allFieldsFilled',
            window.MktoForms2?.getForm(formId)?.allFieldsFilled()
          )
          break
      }
    }
  }

  function sendResizeEvent() {
    // Timeout allows a repaint to happen before we get the values
    setTimeout(() => {
      sendEventToParent('onResize', {
        width: window.innerWidth,
        height: window.innerHeight,
        scrollHeight: document.documentElement.scrollHeight
      })
    }, 100)
  }

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

  // 3. Load external script and attach resize event
  useEffect(() => {
    if (routerReady) {
      // Resize events
      const resize = () => {
        if (formRef.current) {
          if (window.parent.innerWidth >= formBreakpoint) {
            formRef.current.classList.add('allow-columns')
          } else {
            formRef.current.classList.remove('allow-columns')
          }
        }
        sendResizeEvent()
      }
      window.addEventListener('resize', resize)
      resize()

      // Add marketo script
      const script = document.createElement('script')
      script.src = `${BASE_URL}/js/forms2/js/forms2.min.js`
      script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null)
      document.body.appendChild(script)

      // We have to do this because marketo does validation on different
      // events but it doesn't trigger the `onValidation` hook
      const catchInputEvents = (event: Event) => {
        const target = event.target as HTMLInputElement
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
          sendResizeEvent()
        }
      }

      document.body.addEventListener('keyup', catchInputEvents, true)
      document.body.addEventListener('input', catchInputEvents, true)
      document.body.addEventListener('change', catchInputEvents, true)
      document.body.addEventListener('focus', catchInputEvents, true)
      document.body.addEventListener('blur', catchInputEvents, true)

      // Clean up on unmount
      return () => {
        window.removeEventListener('resize', resize)
        document.body.removeEventListener('keyup', catchInputEvents, true)
        document.body.removeEventListener('input', catchInputEvents, true)
        document.body.removeEventListener('change', catchInputEvents, true)
        document.body.removeEventListener('focus', catchInputEvents, true)
        document.body.removeEventListener('blur', catchInputEvents, true)
        script.remove()
      }
    }
  }, [routerReady])

  // 4. Call Marketo JS API
  useEffect(() => {
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
      })

      // Init the marketo JS api
      window.MktoForms2.loadForm(
        BASE_URL,
        MUNCHKIN_ID,
        formId,
        function (marketoFormObject) {
          // Remove marketo added styles
          removeMarketoStyles(marketoFormObject)

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
          sendResizeEvent()

          // Send validation event
          marketoFormObject.onValidate((isValid) => {
            sendEventToParent('onValidate', isValid)
            sendResizeEvent()
          })

          // Send submit event
          marketoFormObject.onSubmit(() => {
            sendEventToParent('onSubmit')
            sendResizeEvent()
          })

          // Prevent redirection
          marketoFormObject.onSuccess((values, redirect) => {
            sendEventToParent('onSuccess', { values, redirect })
            sendResizeEvent()
            return false
          })

          // Listen for events from the parent
          window.addEventListener('message', recieveEventFromParent)
        }
      )

      // Clean-up on unmount
      return () => {
        if (formRef.current) formRef.current.innerHTML = ''
        window.removeEventListener('message', recieveEventFromParent)
      }
    }
  }, [routerReady, scriptLoaded])

  return (
    <>
      <div className={styles.marketoFormContainerV2}>
        <form className='mktoForm' id={`mktoForm_${formId}`} ref={formRef} />
      </div>
    </>
  )
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
    Array.from(scopedStyles).forEach((el) => el.remove())

    // Remove inline style attributes
    const inlineStyles = formElement.querySelectorAll('[style]')
    Array.from(inlineStyles).forEach((el) => el.removeAttribute('style'))

    // Remove inline style from <form> element
    formElement.removeAttribute('style')
  }
}

// @link https://blog.teknkl.com/fix-forms-20-referrer-cached-single-page-application/
function fixMarketoReferer(
  marketoFormObject: MarketoFormObject,
  referer?: string
) {
  const nativeGetValues = marketoFormObject.getValues
  marketoFormObject.onSubmit(function (submittingForm) {
    submittingForm.getValues = function () {
      const values = nativeGetValues()
      Object.defineProperty(values, '_mktoReferrer', {
        value:
          referer || window.location !== window.parent.location
            ? document.referrer
            : document.location.href,
        enumerable: true
      })
      return values
    }
  })
}
