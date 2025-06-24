import MarketoForm, { SpoofedMarketoObject } from '../../MarketoForm'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

function ContactForm() {
  const router = useRouter()

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [useCase, setUseCase] = useState<string>('')
  const [marketoForm, setMarketoForm] = useState<SpoofedMarketoObject>()

  useEffect(() => {
    if (router.query.custom) {
      let customPricingQuoteObj = { ...router.query }

      let memory = '16GiB'
      if (
        customPricingQuoteObj.minMemory &&
        customPricingQuoteObj.maxMemory &&
        customPricingQuoteObj.tier
      ) {
        if (customPricingQuoteObj.tier === 'Production') {
          memory = `${customPricingQuoteObj.minMemory}GiB - ${customPricingQuoteObj.maxMemory}GiB`
        }
      }
      setUseCase(`
--- Custom pricing request ---
Service type: ${customPricingQuoteObj.tier}
Provider: ${customPricingQuoteObj.provider}
Region: ${customPricingQuoteObj.region}
Active hours: ${customPricingQuoteObj.hours}
Data volume: ${customPricingQuoteObj.storageSize}GB
Data compressed: ${customPricingQuoteObj.storageCompressed}
Compute: ${memory}`)
    }
  }, [router.query])

  useEffect(() => {
    if (marketoForm && useCase) {
      marketoForm.setValues({
        programmessagefull: useCase
      })
    }
  }, [marketoForm, useCase])

  return (
    <>
      {!formSuccess && (
        <MarketoForm
          formId={'1294'}
          clearbitTracking={true}
          disclaimer='登録することで、ClickHouseがお客さまの個人情報をプライバシーポリシーに従って処理することに同意したと見なされます。'
          onLoad={(formObject) => {
            setFormLoaded(true)
            setMarketoForm(formObject)
          }}
          onSuccess={() => {
            setFormSuccess(true)
            // Delay needed to allow the ref to update before scrolling
            setTimeout(() => {
              formSuccessRef.current?.scrollIntoView()
            }, 10)

            return false // Stops page from reloading
          }}
        />
      )}

      {!formLoaded && (
        <div className='text-center'>フォームを読み込んでいます...</div>
      )}

      {formSuccess && (
        <div ref={formSuccessRef}>
          <h3 className='text-center text-2xl font-bold'>
            ご提出いただきありがとうございます!
          </h3>
          <p className='mt-2 text-center text-neutral-200'>
            すぐにご連絡させていただきます。
          </p>
        </div>
      )}
    </>
  )
}

export default ContactForm
