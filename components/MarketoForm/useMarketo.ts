import { useState, useEffect } from 'react'
import { MarketoFormsApi, MarketoFormProps, MarketoFormObject } from './types'

declare global {
  interface Window {
    MktoForms2: MarketoFormsApi
  }
}

function addMarketoFormsScript(
  baseUrl: string,
  setScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>
): void {
  if (window.MktoForms2) return setScriptLoaded(true)

  const script = document.createElement('script')
  script.src = `${baseUrl.replace(/\/$/, '')}/js/forms2/js/forms2.min.js`
  script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null)
  document.body.appendChild(script)
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

function useMarketo({
  baseUrl = '//discover.clickhouse.com',
  munchkinId = '238-FPC-317',
  formId,
  onLoad,
  onSuccess
}: MarketoFormProps): void {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (scriptLoaded) {

      // Fixes marketo referrer issue for SPAs
      // @link https://blog.teknkl.com/fix-forms-20-referrer-cached-single-page-application/
      window.MktoForms2.whenReady(function(readyForm){
        const nativeGetValues = readyForm.getValues;
        readyForm.onSubmit(function(submittingForm){
          submittingForm.getValues = function() {
            const values = nativeGetValues();
            Object.defineProperty(values, '_mktoReferrer', {
              value: document.location.href,
              enumerable: true
            });
            return values;
          };
        });
      });

      // Load the form with and attach callbacks
      window.MktoForms2.loadForm(baseUrl, munchkinId, formId, marketoFormObject => {

        removeMarketoStyles(marketoFormObject)

        marketoFormObject.addHiddenFields({
          formReferrer: window.location.toString()
        })

        if (onLoad) onLoad(marketoFormObject)

        if (onSuccess) {
          marketoFormObject.onSuccess((response, redirect) => {
            const result = onSuccess(marketoFormObject, response, redirect)
            if (typeof result !== "undefined") {
              return result
            }
          });
        }

      })

      // Remove styles unwanted styles on re-render
      window.MktoForms2.onFormRender(marketoFormObject => {
        removeMarketoStyles(marketoFormObject)
      })

      return
    }
    addMarketoFormsScript(baseUrl, setScriptLoaded)
  }, [scriptLoaded, baseUrl, munchkinId, formId])
}

export default useMarketo
