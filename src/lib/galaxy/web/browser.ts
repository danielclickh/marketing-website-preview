import { ErrorHandler, GalaxyClient, HttpClient } from '../client'
import { enableGalaxyLogging } from '../logging'
import { v4 as uuid } from 'uuid'

declare global {
  interface Window {
    Cypress?: boolean
  }
}

export type GalaxyOptions = {
  httpClient: HttpClient
  errorHandler?: ErrorHandler
  replaceConsoleLog?: boolean
  application: string
  tags?: Array<string>
  apiHost: string
  getUserId: () => string | null
  getSessionId?: () => string
  getContext?: () => Record<string, unknown>
}

let client: GalaxyClient
const MILLIS_PER_SECOND = 1000
const BATCH_TIME_SECONDS = 5

export type InitResult = [GalaxyClient, () => void]

function init(options: GalaxyOptions): InitResult {
  const { replaceConsoleLog, getUserId, getSessionId, ...clientOptions } =
    options

  client = new GalaxyClient({
    ...clientOptions,
    getUserId: () => getUserId() ?? getAnonymousId(),
    getSessionId: () => (getSessionId ? getSessionId() : getGalaxySessionId()),
    getContext(): Record<string, unknown> {
      return {
        page: window.location.href,
        userAgent: navigator.userAgent,
        ...(options.getContext ? options.getContext() : {})
      }
    }
  })

  if (replaceConsoleLog) {
    enableGalaxyLogging(client)
  }

  const interval = setInterval(() => {
    client.flushEvents()
  }, BATCH_TIME_SECONDS * MILLIS_PER_SECOND)

  const stopGalaxy = () => {
    clearInterval(interval)
    client.cleanup()
  }

  window.addEventListener('beforeunload', stopGalaxy)
  window.addEventListener('window:unload', stopGalaxy)
  return [client, stopGalaxy]
}

function galaxy(): GalaxyClient {
  if (!client) {
    throw new Error('Please make sure you call "init" first')
  }

  return client
}

const getGalaxySessionId = (): string => {
  try {
    if (!window.sessionStorage.getItem('glx_id')) {
      window.sessionStorage.setItem('glx_id', uuid())
    }

    return window.sessionStorage.getItem('glx_id') ?? 'unknown'
  } catch (error) {
    return 'unknown'
  }
}

const getAnonymousId = (): string => {
  try {
    if (!window.sessionStorage.getItem('glx_anonymous_id')) {
      window.sessionStorage.setItem('glx_anonymous_id', uuid())
    }

    return window.sessionStorage.getItem('glx_anonymous_id') ?? 'unknown'
  } catch (error) {
    return 'unknown'
  }
}

export type GalaxyWeb = {
  init: typeof init
  galaxy: typeof galaxy
  getAnonymousId: typeof getAnonymousId
  getGalaxySessionId: typeof getGalaxySessionId
}

export const Galaxy: GalaxyWeb = {
  init,
  galaxy,
  getAnonymousId,
  getGalaxySessionId
}
