import { resolveHref } from 'next/dist/client/resolve-href'
import { useRouter } from 'next/router'
import { useEffect, useId, useRef, useState } from 'react'
import Markdown from '../Markdown'

type SpoofedMarketoValuesObject = Record<string, any>

export interface SpoofedMarketoObject {
  getId(): string
  getFormElem(): null
  validate(): Promise<boolean>
  onValidate(callback: (success: boolean) => void): SpoofedMarketoObject
  submit(): SpoofedMarketoObject
  onSubmit(callback: (form: SpoofedMarketoObject) => void): SpoofedMarketoObject
  onSuccess(
    callback: (
      values: SpoofedMarketoValuesObject,
      redirect: string | null
    ) => void
  ): SpoofedMarketoObject
  submittable(canSubmit?: boolean): Promise<boolean | SpoofedMarketoObject>
  submitable(canSubmit?: boolean): Promise<boolean | SpoofedMarketoObject>
  allFieldsFilled(): Promise<boolean>
  setValues(values: SpoofedMarketoValuesObject): void
  getValues(): Promise<SpoofedMarketoValuesObject>
  addHiddenFields(values: SpoofedMarketoValuesObject): void
  vals(
    values?: SpoofedMarketoValuesObject
  ): Promise<SpoofedMarketoValuesObject> | undefined
  showErrorMessage(message: string): SpoofedMarketoObject
}

interface MarketoObjectController extends SpoofedMarketoObject {
  _onValidateListeners: Array<(success: boolean) => void>
  _onSubmitListeners: Array<(form: SpoofedMarketoObject) => void>
  _onSuccessListeners: Array<
    (values: SpoofedMarketoValuesObject, redirect: string | null) => void
  >
  _validateListener: null | Function
  _getValuesListener: null | Function
  _submittableListener: null | Function
  _allFieldsFilledListener: null | Function
}

type MarketoFormProps = {
  formId: string
  disclaimer?: string | false

  // Callbacks
  onLoad?: (formObject: SpoofedMarketoObject) => any
  onSuccess?: (
    values: SpoofedMarketoValuesObject,
    redirect: string | null
  ) => any
}

export default function MarketoForm({
  formId,
  disclaimer = 'By registering, you acknowledge that ClickHouse will process your personal information in accordance with our [Privacy Policy](/legal/privacy-policy).',
  onLoad,
  onSuccess
}: MarketoFormProps) {
  const router = useRouter()
  const instanceId = useId()
  const instanceEventPrefix = `mkto-${instanceId}-${formId}`

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [mountIframe, setMountIframe] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [iframeHeight, setIframeHeight] = useState(24)

  function sendEventToIframe(eventName: string, data: any = undefined) {
    if (iframeRef.current) {
      iframeRef.current?.contentWindow?.postMessage({
        type: `${instanceEventPrefix}-${eventName}`,
        data: data
      })
      return true
    }

    return false
  }

  const spoofMarketoFormObject: MarketoObjectController = {
    _onSubmitListeners: [],
    _onValidateListeners: [],
    _onSuccessListeners: [],
    _validateListener: null,
    _getValuesListener: null,
    _submittableListener: null,
    _allFieldsFilledListener: null,

    getId() {
      return formId
    },
    getFormElem() {
      console.warn('getFormElem() method not available')
      return null
    },

    async validate() {
      return new Promise((resolve) => {
        this._validateListener = resolve
        sendEventToIframe('validate')
      })
    },
    onValidate(callback) {
      this._onValidateListeners.push(callback)
      return this
    },
    submit() {
      sendEventToIframe('submit')
      return this
    },
    onSubmit(callback) {
      this._onSubmitListeners.push(callback)
      return this
    },
    onSuccess(callback) {
      this._onSuccessListeners.push(callback)
      return this
    },
    async submittable(canSubmit) {
      return new Promise((resolve) => {
        this._submittableListener = resolve
        sendEventToIframe('submittable', canSubmit)
      })
    },
    async submitable(canSubmit) {
      return this.submittable(canSubmit)
    },
    async allFieldsFilled() {
      return new Promise((resolve) => {
        this._allFieldsFilledListener = resolve
        sendEventToIframe('allFieldsFilled')
      })
    },
    setValues(values) {
      sendEventToIframe('setValues', values)
    },
    async getValues() {
      return new Promise((resolve) => {
        this._getValuesListener = resolve
        sendEventToIframe('getValues')
      })
    },
    addHiddenFields(values) {
      sendEventToIframe('addHiddenFields', values)
    },
    vals(values) {
      if (values) {
        this.setValues(values)
        return undefined
      }
      return this.getValues()
    },
    showErrorMessage(message) {
      sendEventToIframe('showErrorMessage', message)
      return this
    }
  }

  function recieveEventFromIframe({ data }: MessageEvent) {
    if (typeof data === 'object' && 'type' in data && 'data' in data) {
      const eventType = data.type
      const eventData = data.data

      switch (eventType) {
        case `${instanceEventPrefix}-onResize`:
          const height = eventData?.height
          const scrollHeight = eventData?.scrollHeight
          setIframeHeight(scrollHeight || height)
          break
        case `${instanceEventPrefix}-onLoad`:
          setFormLoaded(true)
          if (typeof onLoad === 'function') {
            onLoad(spoofMarketoFormObject)
          }
          break
        case `${instanceEventPrefix}-onValidate`:
          spoofMarketoFormObject._onValidateListeners.forEach((callback) => {
            callback(eventData)
          })
          break
        case `${instanceEventPrefix}-onSubmit`:
          spoofMarketoFormObject._onSubmitListeners.forEach((callback) => {
            callback(spoofMarketoFormObject as SpoofedMarketoObject)
          })
          break
        case `${instanceEventPrefix}-onSuccess`:
          setFormSuccess(true)
          spoofMarketoFormObject._onSuccessListeners.forEach((callback) => {
            callback(eventData.values, eventData.redirect)
          })
          if (typeof onSuccess === 'function') {
            onSuccess(eventData?.response, eventData?.redirect)
          }
          break

        case `${instanceEventPrefix}-validate`:
          if (spoofMarketoFormObject._validateListener) {
            spoofMarketoFormObject._validateListener(eventData)
            spoofMarketoFormObject._validateListener = null
          }
          break

        case `${instanceEventPrefix}-getValues`:
          if (spoofMarketoFormObject._getValuesListener) {
            spoofMarketoFormObject._getValuesListener(eventData)
            spoofMarketoFormObject._getValuesListener = null
          }
          break

        case `${instanceEventPrefix}-submittable`:
          if (spoofMarketoFormObject._submittableListener) {
            spoofMarketoFormObject._submittableListener(eventData)
            spoofMarketoFormObject._submittableListener = null
          }
          break

        case `${instanceEventPrefix}-allFieldsFilled`:
          if (spoofMarketoFormObject._allFieldsFilledListener) {
            spoofMarketoFormObject._allFieldsFilledListener(eventData)
            spoofMarketoFormObject._allFieldsFilledListener = null
          }
          break
      }
    }
  }

  useEffect(() => {
    window.addEventListener('message', recieveEventFromIframe)
    setMountIframe(true)
    return () => {
      window.removeEventListener('message', recieveEventFromIframe)
    }
  }, [])

  return (
    <>
      {mountIframe && (
        <iframe
          ref={iframeRef}
          src={resolveHref(
            router,
            `/marketo-forms/${formId}?iid=${encodeURIComponent(instanceId)}`
          )}
          height={iframeHeight < 24 ? 24 : iframeHeight}
          scrolling='no' // Deprecated but still hides scrollbars
          className={`w-full !bg-transparent transition-opacity ${
            formLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {formLoaded && !formSuccess && disclaimer && disclaimer.length && (
        <div className='disclaimer-text mt-3 text-center text-sm font-medium text-neutral-200'>
          <Markdown>{disclaimer}</Markdown>
        </div>
      )}
    </>
  )
}
