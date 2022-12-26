import environment from '../../../environment'
import {
  WorkatoNewsletterRequest,
  WorkatoContactRequest,
  WorkatoEventRegisterRequest,
  WorkatoRecordedGatedContentRequest,
  WorkatoRequest,
  WorkatoResponse
} from './types'

export async function submitNewsletterForm(email: string): Promise<void> {
  const request: WorkatoNewsletterRequest = { email }
  await submitWorkatoForm('newsletter', request)
}

export async function websiteContact(
  firstName: string,
  lastName: string,
  email: string,
  company?: string,
  message?: string
): Promise<void> {
  const request: WorkatoContactRequest = {
    firstName,
    lastName,
    email,
    company,
    message
  }
  await submitWorkatoForm('websiteContact', request)
}

export async function eventRegistration(
  firstName: string,
  lastName: string,
  email: string
): Promise<void> {
  const request: WorkatoEventRegisterRequest = { firstName, lastName, email }
  await submitWorkatoForm('eventRegistration', request)
}

export async function recordedGatedContent(email: string): Promise<void> {
  const request: WorkatoRecordedGatedContentRequest = { email }
  await submitWorkatoForm('recordedGatedContent', request)
}

export async function submitWorkatoForm(
  formType:
    | 'newsletter'
    | 'websiteContact'
    | 'eventRegistration'
    | 'recordedGatedContent'
    | 'serviceUnavailableCountry',
  request: WorkatoRequest
) {
  const marketCookie = getMarketoCookie()
  const params = new URLSearchParams(window.location.search)

  request = {
    ...request,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_source: params.get('utm_source') ?? undefined,
    mkto_trk: marketCookie
  }

  request.url = window.location.href
  const response = await fetch(`${environment.workatoApiBaseUrl}/${formType}`, {
    method: 'post',
    body: JSON.stringify(request),
    headers: {
      'API-TOKEN': `${environment.workatoApiBaseUrl}`
    }
  })
  const workatoResp: WorkatoResponse = await response.json()
  if (request.email) {
    const email = request.email
    const firstName = request.firstName
    const lastName = request.lastName
    const userId = workatoResp?.cloudId ? workatoResp.cloudId : email
    segmentService.identify(email, firstName, lastName, userId)
    segmentService.trackEvent('Form Submitted', {
      email,
      userId,
      _mkt_trk: marketCookie
    })
  }
}

function getMarketoCookie(): string | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const cookieMap = document.cookie.split('; ').reduce((prev, item) => {
      const splitItem: string[] = item.split('=')
      prev[splitItem[0]] = splitItem[1]
      return prev
    }, {} as Record<string, string>)
    return cookieMap['_mkto_trk']
  } catch (e) {
    console.error(e)
  }
  return undefined
}
