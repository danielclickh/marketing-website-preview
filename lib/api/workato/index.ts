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

  let text = ''
  const workatoPromise = new Promise<string>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_WORKATO_API_URL}/${formType}`, {
      method: 'post',
      body: JSON.stringify(request),
      headers: {
        'API-TOKEN': `${process.env.NEXT_PUBLIC_WORKATO_TOKEN}`
      }
    }).then(function readAllChunks(res: Response) {
      const reader = res.body?.getReader()

      const read = () => {
        if (reader) {
          // read the data
          reader
            .read()
            .then(({ done, value }: { done: boolean; value?: Uint8Array }) => {
              // Result objects contain two properties:
              // done  - true if the stream has already given you all its data.
              // value - some data. Always undefined when done is true.
              if (done) {
                if (value) {
                  const decoder = new TextDecoder()
                  text += decoder.decode(value)
                }
                resolve(text)
                return
              }

              const decoder = new TextDecoder()
              text += decoder.decode(value)
              read()
            })
        } else {
          read()
        }
      }

      read()
    })
  })

  const response = await workatoPromise
  const workatoResp: WorkatoResponse = response.length
    ? JSON.parse(response)
    : {}
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
