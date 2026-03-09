import { GalaxyClient } from './index'

const application = 'testApplication'
const tags = ['TEST', 'tag2']
describe('GalaxyClient', () => {
  const client = new GalaxyClient({
    application: application,
    apiHost: 'http://test.host',
    httpClient: {
      post: jest.fn()
    },
    errorHandler: {
      captureException: jest.fn()
    },
    tags,
    getUserId: () => 'userId',
    getSessionId: () => 'sessionId',
    getContext() {
      return {
        page: 'https://my-current-page',
        userAgent: 'my-user-agent',
        service: {
          id: 'my-service-id'
        },
        orgId: 'my-org-id'
      }
    }
  })

  beforeEach(() => {
    client.eventsQueue = []
  })

  it('enqueues a galaxy event', () => {
    client.track('eventNamespace.eventComponent.eventName', {
      interaction: 'trigger',
      custom: 'customValue'
    })

    expect(client.eventsQueue).toHaveLength(1)
    const event = client.eventsQueue[0]
    expect(event.application).toEqual(application)
    expect(event.component).toEqual('eventComponent')
    expect(event.namespace).toEqual('eventNamespace')
    expect(event.event).toEqual('eventName')
    expect(event.interaction).toEqual('trigger')
    expect(event.orgId).toEqual('my-org-id')
    expect(event.timestamp).toBeDefined()
    expect(event.properties.properties['service']['id']).toEqual(
      'my-service-id'
    )
    expect(event.properties.properties['orgId']).toEqual('my-org-id')
    expect(event.properties.properties['userAgent']).toEqual('my-user-agent')
    expect(event.properties.properties['page']).toEqual(
      'https://my-current-page'
    )
  })

  it('allows to track events just by specifying the fully qualified name as a click interaction', () => {
    client.track('eventNamespace.eventComponent.eventName')

    expect(client.eventsQueue).toHaveLength(1)

    const event = client.eventsQueue[0]
    expect(event.application).toEqual(application)
    expect(event.component).toEqual('eventComponent')
    expect(event.namespace).toEqual('eventNamespace')
    expect(event.event).toEqual('eventName')
    expect(event.interaction).toEqual('click')
    expect(event.orgId).toEqual('my-org-id')
    expect(event.timestamp).toBeDefined()
    expect(event.properties.properties['service']['id']).toEqual(
      'my-service-id'
    )
    expect(event.properties.properties['orgId']).toEqual('my-org-id')
    expect(event.properties.properties['userAgent']).toEqual('my-user-agent')
    expect(event.properties.properties['page']).toEqual(
      'https://my-current-page'
    )
  })

  it('logs a message to galaxy', () => {
    client.log('INFO', 'my first arg', 'my second arg', 'my third arg')
    expect(client.eventsQueue).toHaveLength(1)

    const event = client.eventsQueue[0]
    expect(event.application).toEqual(application)
    expect(event.component).toEqual('INFO')
    expect(event.namespace).toEqual('logs')
    expect(event.event).toEqual('trace')
    expect(event.interaction).toEqual('trigger')
    expect(event.orgId).toEqual('my-org-id')
    expect(event.timestamp).toBeDefined()
    expect(event.message).toEqual('[TEST][tag2] my first arg')
    expect(event.properties.properties['service']['id']).toEqual(
      'my-service-id'
    )
    expect(event.properties.properties['orgId']).toEqual('my-org-id')
    expect(event.properties.properties['userAgent']).toEqual('my-user-agent')
    expect(event.properties.properties['page']).toEqual(
      'https://my-current-page'
    )
    expect(event.properties.values[0]).toEqual('my second arg')
    expect(event.properties.values[1]).toEqual('my third arg')
  })

  it('sends a forensic event to galaxy', () => {
    client.forensic({
      component: 'MyComponent',
      event: 'my event',
      message: 'my message',
      interaction: 'keypress',
      properties: {
        serviceId: 'my-service-id',
        orgId: 'my-org-id',
        custom: 'my-custom-property'
      }
    })

    expect(client.eventsQueue).toHaveLength(1)

    const event = client.eventsQueue[0]
    expect(event.application).toEqual(application)
    expect(event.namespace).toEqual('forensics')
    expect(event.component).toEqual('MyComponent')
    expect(event.event).toEqual('my event')
    expect(event.interaction).toEqual('keypress')
    expect(event.timestamp).toBeDefined()
    expect(event.orgId).toEqual('my-org-id')
    expect(event.properties.properties['service']['id']).toEqual(
      'my-service-id'
    )
    expect(event.properties.properties['orgId']).toEqual('my-org-id')
    expect(event.properties.properties['userAgent']).toEqual('my-user-agent')
    expect(event.properties.properties['page']).toEqual(
      'https://my-current-page'
    )
  })
})
