import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MarketoFormObject, MarketoFormsApi } from '../../types/marketo-form'
import styles from './styles.module.scss'

const BASE_URL = '//discover.clickhouse.com'
const MUNCHKIN_ID = '238-FPC-317'

declare global {
  interface Window {
    MktoForms2: MarketoFormsApi
  }
}

export default function Page() {

  const router = useRouter()
  const formId = typeof router.query?.id === 'string' ? router.query.id : ''

  // Component ID passed from parent
  const instanceId = typeof router.query?.iid === 'string' ? router.query.iid : ''

  // Referer URL passed from parent
  const referer = typeof router.query?.referer === 'string' ? router.query.referer : ''

  // Prefix events so the parent can identify events from multiple forms iframes
  const instanceEventPrefix = ['mkto', instanceId, formId].filter(val => !!val).join('-')

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

  function sendResizeEvent() {
    sendEventToParent('resize', {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight
    })
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
      window.addEventListener('resize', sendResizeEvent)
      sendResizeEvent()

      // Add marketo script
      const script = document.createElement('script')
      script.src = `${BASE_URL}/js/forms2/js/forms2.min.js`
      script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null)
      document.body.appendChild(script)

      // We have to do this because marketo does validation on different
      // events but it doesn't trigger the `onValidation` hook
      const catchInputEvents = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
          setTimeout(sendResizeEvent, 100)
        }
      }

      document.body.addEventListener('change', catchInputEvents, true)
      document.body.addEventListener('focus', catchInputEvents, true)
      document.body.addEventListener('blur', catchInputEvents, true)

      // Clean up on unmount
      return () => {
        window.removeEventListener('resize', sendResizeEvent)
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
      // @link https://blog.teknkl.com/fix-forms-20-referrer-cached-single-page-application/
      window.MktoForms2.whenReady(function(readyForm){
        const nativeGetValues = readyForm.getValues;
        readyForm.onSubmit(function(submittingForm){
          submittingForm.getValues = function() {
            const values = nativeGetValues()
            Object.defineProperty(values, '_mktoReferrer', {
              value: referer || window.location !== window.parent.location ? document.referrer : document.location.href,
              enumerable: true
            })
            return values
          }
        })
      })

      // Remove styles unwanted styles on re-render
      window.MktoForms2.onFormRender(marketoFormObject => {
        removeMarketoStyles(marketoFormObject)
      })

      // Init the marketo JS api
      window.MktoForms2.loadForm(BASE_URL, MUNCHKIN_ID, formId, function(marketoFormObject) {

        // Send form loaded event
        sendEventToParent('formLoaded')
        setTimeout(sendResizeEvent, 100)

        // Remove marketo added styles
        removeMarketoStyles(marketoFormObject)

        // Send validation event
        marketoFormObject.onValidate(() => setTimeout(sendResizeEvent, 100))

        // Prevent redirection
        marketoFormObject.onSuccess((response, redirect) => {
          sendEventToParent('formSuccess', {
            response,
            redirect
          })
          return false
        })
      })

    }
  }, [routerReady, scriptLoaded])

  return (
    <>
      <div className={styles.marketoFormContainerV2}>
        <form
          className='mktoForm'
          id={`mktoForm_${formId}`}
          ref={formRef} />
      </div>
    </>
  )
}

function removeMarketoStyles(marketoFormObject: MarketoFormObject) {

  const jqueryElement = marketoFormObject.getFormElem()
  const formElement = jqueryElement.get(0)

  // Remove marketo <link> styles
  const styleLinks = document.querySelectorAll('#mktoForms2ThemeStyle, #mktoForms2BaseStyle');
  Array.from(styleLinks).forEach(el => el.remove());

  if (formElement) {

    // Remove fixed widths for improved responsiveness
    const fixedWidths = formElement.querySelectorAll<HTMLElement>('.mktoHasWidth');
    Array.from(fixedWidths).forEach(el => {
      el.classList.remove('mktoHasWidth')
      delete el.dataset.mktoFixedWidth
      el.removeAttribute('data-mktoFixedWidth') // Just incase ¯\_(ツ)_/¯
    })

    // Remove form <style> elements
    const scopedStyles = formElement.querySelectorAll('style');
    Array.from(scopedStyles).forEach(el => el.remove());

    // Remove inline style attributes
    const inlineStyles = formElement.querySelectorAll('[style]');
    Array.from(inlineStyles).forEach(el => el.removeAttribute('style'));

    // Remove inline style from <form> element
    formElement.removeAttribute('style');
  }
}
