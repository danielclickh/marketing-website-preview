import environment from '../../../environment'
import { WorkatoRequest, WorkatoResponse } from './types'

interface WorkatoFormResponse extends WorkatoResponse {
  marketCookie?: string
}

export async function submitWorkatoForm(
  formType:
    | 'newsletter'
    | 'websiteContact'
    | 'eventRegistration'
    | 'recordedGatedContent'
    | 'serviceUnavailableCountry',
  request: WorkatoRequest
): Promise<WorkatoFormResponse> {
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
  return { ...workatoResp, marketCookie }
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
