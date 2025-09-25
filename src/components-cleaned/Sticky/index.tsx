import React, { useEffect, useRef } from 'react'

type StickyProps = <T extends React.ElementType = 'div'>(
  props: {
    as?: T
    staticClassName?: string // when NOT stuck
    stuckClassName?: string // when stuck
    options?: IntersectionObserverInit
    onStuckChange?: (isStuck: boolean) => void
    top?: number | 'header'
  } & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'ref'>
) => React.ReactElement | null

function resolveTopPx(el: HTMLElement, top: number | 'header' | undefined) {
  if (typeof top === 'number') return top
  if (top === 'header') {
    const v =
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-height'
      ) || '72px'
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : 72
  }
  const comp = getComputedStyle(el).top
  const n = parseFloat(comp)
  return Number.isFinite(n) ? n : 0
}

function getScrollRoot(el: HTMLElement | null): Element | null {
  if (!el) return null
  for (let p = el.parentElement; p; p = p.parentElement) {
    const s = getComputedStyle(p)
    const ov = `${s.overflow}${s.overflowX}${s.overflowY}`
    if (/(auto|scroll|overlay)/.test(ov)) return p
  }
  // null => viewport
  return null
}

const Sticky: StickyProps = ({
  as,
  staticClassName = '',
  stuckClassName = '',
  options,
  onStuckChange,
  className = '',
  children,
  top = 'header',
  style = {},
  ...props
}: any) => {
  const Component = as || 'div'
  const ref = useRef<HTMLElement | null>(null)
  const ioRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const roRef = useRef<ResizeObserver | null>(null)
  const lastTopPxRef = useRef<number>(0)
  const stuckStateRef = useRef<boolean>(false)

  useEffect(() => {
    const el = ref.current
    const sentinel = sentinelRef.current
    if (!el || !sentinel) return

    const staticClasses: Array<string> = staticClassName
      .split(/\s+/)
      .filter(Boolean)
    const stuckClasses: Array<string> = stuckClassName
      .split(/\s+/)
      .filter(Boolean)

    // ensure initial NOT-stuck state
    if (staticClasses.length) el.classList.add(...staticClasses)
    if (stuckClasses.length) el.classList.remove(...stuckClasses)
    el.dataset.stuck = 'false'
    stuckStateRef.current = false

    const rootEl = getScrollRoot(el)
    const root: Element | null = rootEl // null => viewport

    const applyStuck = (isStuck: boolean) => {
      // toggle classes
      staticClasses.forEach((c) => el.classList.toggle(c, !isStuck))
      stuckClasses.forEach((c) => el.classList.toggle(c, isStuck))
      // dataset + callback only on change
      if (stuckStateRef.current !== isStuck) {
        stuckStateRef.current = isStuck
        el.dataset.stuck = isStuck ? 'true' : 'false'
        onStuckChange?.(isStuck)
      }
    }

    const buildObserver = (offsetPx: number) => {
      ioRef.current?.disconnect()
      const io = new IntersectionObserver(
        ([entry]) => {
          // When the sentinel crosses the “trip line” (top offset), the sticky engages.
          const isStuck = !entry.isIntersecting
          applyStuck(isStuck)
        },
        {
          root,
          threshold: 0,
          // shift the top trip line down by the sticky top offset
          rootMargin: `-${offsetPx}px 0px 0px 0px`,
          ...(options || {})
        }
      )
      io.observe(sentinel!)
      ioRef.current = io
    }

    const refresh = () => {
      const topPx = resolveTopPx(el, top)
      if (topPx !== lastTopPxRef.current) {
        lastTopPxRef.current = topPx
        buildObserver(topPx)
      }
    }

    // initial setup
    refresh()

    // respond to layout changes (header height, media queries, etc.)
    roRef.current?.disconnect()
    const ro = new ResizeObserver(() => refresh())
    ro.observe(el)
    if (rootEl instanceof Element) ro.observe(rootEl)
    ro.observe(document.documentElement)
    roRef.current = ro
    window.addEventListener('resize', refresh)

    return () => {
      ioRef.current?.disconnect()
      roRef.current?.disconnect()
      window.removeEventListener('resize', refresh)
      // keep sentinel in DOM in case this component re-mounts nearby; remove if you prefer cleanup:
      if (sentinelRef.current && sentinelRef.current.parentNode) {
        sentinelRef.current.parentNode.removeChild(sentinelRef.current)
      }
      sentinelRef.current = null
    }
  }, [staticClassName, stuckClassName, options, onStuckChange, top])

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden='true'
        className='pointer-events-none static m-0 h-px p-0'
      />
      <Component
        ref={ref as any}
        className={`sticky ${className}`}
        style={{
          top: top === 'header' ? 'var(--header-height, 72px)' : top,
          position: 'sticky',
          ...style
        }}
        {...props}>
        {children}
      </Component>
    </>
  )
}

export default Sticky
