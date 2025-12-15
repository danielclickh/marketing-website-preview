import { logFns } from '../logging'

type FetchOptions = Record<string, unknown>

export interface HttpClient {
  post(apiPath: string, bodyRequest: FetchOptions): Promise<Response>
}

export interface ErrorHandler {
  captureException: (exception: unknown) => void
}

export type GalaxyProperties = Record<string, any>
export type AnalyticsInteraction =
  | 'trigger'
  | 'click'
  | 'rightclick'
  | 'doubleclick'
  | 'shortcut'
  | 'keypress'

export type GalaxyApplicationEvent = {
  application: string
  timestamp?: number | string
  namespace: string
  component: string
  event: string
  orgId?: string
  interaction: AnalyticsInteraction
  properties: GalaxyProperties
  userId?: string
  message: string
}

export type ControlPlaneLegacyGalaxyEvent = GalaxyApplicationEvent & {
  identify?: boolean
  reportExternally?: boolean
}

export type GalaxyForensicEvent = Omit<GalaxyApplicationEvent, 'namespace'> & {
  namespace: 'forensics'
  orgId?: string
  userId?: string
}

export type GalaxyLogEvent = Omit<GalaxyApplicationEvent, 'namespace'> & {
  namespace: 'logs'
  message: string
}

export type GalaxyEvent =
  | ControlPlaneLegacyGalaxyEvent
  | GalaxyApplicationEvent
  | GalaxyLogEvent
  | GalaxyForensicEvent

export const GALAXY_API_PATH = 'galaxy'

export type GalaxyClientOptions = {
  httpClient: HttpClient
  errorHandler?: ErrorHandler
  tags?: Array<string>
  application: string
  apiHost: string
  getUserId: () => string
  getSessionId: () => string
  getContext: () => Record<string, unknown>
}

export type FullyQualifiedEvent = `${string}.${string}.${string}`

export type GalaxyApplicationEventProperties = Record<string, any> & {
  interaction: AnalyticsInteraction
}

export type Level = 'INFO' | 'LOG' | 'DEBUG' | 'WARN' | 'ERROR'

export class GalaxyClient {
  public eventsQueue: GalaxyEvent[]
  private tags: Array<string>
  protected httpClient: HttpClient
  private errorHandler?: ErrorHandler
  private application: string
  private apiHost: string
  getContext: () => Record<string, unknown>
  getUserId: () => string
  getSessionId: () => string

  constructor({
    httpClient,
    errorHandler,
    tags,
    application,
    apiHost,
    getUserId,
    getSessionId,
    getContext
  }: GalaxyClientOptions) {
    this.tags = tags ?? []
    this.httpClient = httpClient
    this.errorHandler = errorHandler
    this.application = application
    this.apiHost = apiHost
    this.getUserId = getUserId
    this.getSessionId = getSessionId
    this.getContext = getContext

    this.eventsQueue = []
  }

  setApiHost(apiHost: string) {
    this.apiHost = apiHost
  }

  getPayloadProperties() {
    const result: Record<string, unknown> = {
      application: this.application,
      ...this.getContext()
    }

    return result
  }

  track(
    event: FullyQualifiedEvent,
    properties?: GalaxyApplicationEventProperties
  ): void {
    const { interaction, ...eventProperties } = properties ?? {
      interaction: 'click'
    }
    const [namespace, component, eventName] = event.split('.')
    const payloadProperties = this.getPayloadProperties()
    const galaxyEvent: GalaxyApplicationEvent = {
      application: this.application,
      timestamp: new Date().getTime(),
      userId: this.getUserId(),
      namespace,
      component,
      interaction,
      orgId: payloadProperties['orgId'] as string,
      event: eventName,
      message: eventName,
      properties: {
        properties: payloadProperties,
        ...(eventProperties ?? {})
      }
    }

    this.eventsQueue.push(galaxyEvent)
  }

  extractServiceIdFromLastArg(arg: unknown | null) {
    if (arg && (typeof arg !== 'object' || Array.isArray(arg))) {
      return {
        serviceId: null,
        orgId: null
      }
    }

    const { serviceId, orgId } = arg as Record<string, unknown>

    return {
      serviceId: typeof serviceId === 'string' ? serviceId : null,
      orgId: typeof orgId === 'string' ? orgId : null
    }
  }

  log(level: Level, ...args: unknown[]) {
    try {
      const message = [
        this.tags ? this.tags.map((tag) => `[${tag}]`).join('') : ''
      ]

      const serializedArgs = args.map((arg) => {
        if (arg instanceof Error) {
          return arg.stack || arg.message
        } else {
          return arg
        }
      })

      if (typeof serializedArgs[0] === 'string') {
        const part = serializedArgs.shift() as string
        message.push(part)
      }

      const data: Record<string, unknown> = {
        component: level,
        namespace: 'logs'
      }

      if (serializedArgs.length > 0) {
        data['values'] = serializedArgs
      }

      const payloadProperties = this.getPayloadProperties()
      const messageString = message.join(' ').slice(0, 200)

      const logEvent: GalaxyLogEvent = {
        timestamp: new Date().getTime(),
        namespace: 'logs',
        component: level,
        interaction: 'trigger',
        message: messageString,
        orgId: payloadProperties['orgId'] as string,
        properties: {
          properties: payloadProperties,
          ...data
        },
        event: 'trace',
        application: this.application,
        userId: this.getUserId()
      }

      this.eventsQueue.push(logEvent)
    } catch (error) {
      logFns.error('Could not log to galaxy', error)
    }
  }

  forensic(
    event: Omit<
      GalaxyForensicEvent,
      'application' | 'timestamp' | 'namespace' | 'userId'
    >
  ): void {
    const { properties, ...rest } = event
    const payloadProperties = this.getPayloadProperties()
    const decoratedEvent: GalaxyForensicEvent = {
      application: this.application,
      timestamp: new Date().getTime(),
      namespace: 'forensics',
      userId: this.getUserId(),
      orgId: payloadProperties['orgId'] as string,
      properties: {
        application: this.application,
        properties: {
          ...properties,
          ...payloadProperties
        }
      },
      ...rest
    }
    this.eventsQueue.push(decoratedEvent)
  }

  private async sendEvents(
    rpcCall: string,
    queue: GalaxyEvent[]
  ): Promise<void> {
    try {
      const numEvents = queue.length
      if (numEvents > 0) {
        const request = {
          rpcAction: rpcCall,
          galaxySessionId: this.getSessionId(),
          data: queue.slice(0, numEvents)
        }
        await this.httpClient.post(
          `${this.apiHost}/api/${GALAXY_API_PATH}?${rpcCall}`,
          request
        )
        queue.splice(0, numEvents)
      }
    } catch (error) {
      this.captureException(error)
    }
  }

  private async sendGalaxyEvents(): Promise<void> {
    return await this.sendEvents('sendGalaxyForensicEvent', this.eventsQueue)
  }

  captureException(error: unknown) {
    if (this.errorHandler) {
      this.errorHandler.captureException(error)
    }
  }

  cleanup(): Promise<void> {
    const result = this.flushEvents()
    return result
  }

  async flushEvents(): Promise<void> {
    try {
      await this.sendGalaxyEvents()
    } catch (error) {
      this.captureException(error)
    }
  }
}
