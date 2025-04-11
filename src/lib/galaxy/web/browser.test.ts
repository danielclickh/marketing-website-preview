/** @jest-environment jsdom */
import Galaxy from './browser'

describe('browser', () => {
  let events: Record<string, unknown> = {}

  describe('#init', () => {
    beforeEach(() => {
      // Empty our events before each test case
      events = {}
      // Define the addEventListener method with a Jest mock function
      window.addEventListener = jest.fn((event, callback) => {
        events[event] = callback
      })
    })

    it('initializes the galaxy client for the browser', () => {
      Galaxy.init({
        apiHost: 'https://test.host',
        application: 'test',
        httpClient: {
          post: jest.fn()
        },
        errorHandler: {
          captureException: jest.fn()
        },
        getUserId() {
          return null
        }
      })

      expect(Galaxy.galaxy()).toBeDefined()

      Galaxy.galaxy().track('namespace.component.event')

      expect(window.sessionStorage.getItem('glx_id')).toBeDefined()
      expect(window.sessionStorage.getItem('glx_anonymous_id')).toBeDefined()
      expect(events['beforeunload']).toBeDefined()
      expect(events['window:unload']).toBeDefined()
    })
  })
})
