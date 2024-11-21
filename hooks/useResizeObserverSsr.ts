import useResizeObserver, {
  UseResizeObserverCallback
} from '@react-hook/resize-observer'

class ServerSideResizeObserverPolyfill {
  constructor(callback: ResizeObserverCallback) {}
  observe(target: Element, options?: ResizeObserverOptions) {}
  unobserve(target: Element) {}
}

export default function useResizeObserverSsr<T extends Element>(
  target: React.RefObject<T> | React.ForwardedRef<T> | T | null | undefined,
  callback: UseResizeObserverCallback
) {
  return useResizeObserver(target || null, callback, {
    polyfill:
      typeof window === 'undefined' ? ServerSideResizeObserverPolyfill : null
  })
}
