import { getProxiedMediaPath, getProxiedMediaUrl } from '@/lib/api/strapi'
import Panzoom, { PanzoomObject } from '@panzoom/panzoom'
import { useState, useEffect, useRef } from 'react'

export default function BlogImage({
  node,
  children,
  src,
  preview,
  width,
  height,
  alt,
  ...props
}: any) {
  const imageUrl = getProxiedMediaPath(preview ?? src)

  const imgRef = useRef<HTMLImageElement | null>(null)
  const zoomContainerRef = useRef<HTMLDivElement | null>(null)
  const zoomImgRef = useRef<HTMLImageElement | null>(null)
  const panzoomRef = useRef<PanzoomObject | null>(null)

  const [canZoom, setCanZoom] = useState(false)
  const [isZoom, setIsZoom] = useState(false)

  // Only enable zooming if the image is not linked
  useEffect(() => {
    const el = imgRef.current
    if (el) {
      setCanZoom(!el.closest('a'))
    }
  }, [])

  useEffect(() => {
    if (!isZoom) return

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoom(false)
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [isZoom])

  useEffect(() => {
    if (!isZoom || !zoomImgRef.current || !zoomContainerRef.current) return

    const panzoom = Panzoom(zoomImgRef.current, { pinchAndPan: true })
    panzoomRef.current = panzoom

    const handleWheel = (e: WheelEvent) => {
      panzoom.zoomWithWheel(e, { step: 0.05 })
    }

    zoomContainerRef.current.addEventListener('wheel', handleWheel)

    return () => {
      zoomContainerRef.current?.removeEventListener('wheel', handleWheel)
      panzoom.destroy()
      panzoomRef.current = null
    }
  }, [isZoom])

  return (
    <span className='relative mb-9 flex w-full justify-center'>
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt ?? ''}
        width={width}
        height={height}
        loading='lazy'
        {...props}
      />

      {canZoom && (
        <>
          <button
            onClick={() => setIsZoom(true)}
            className='absolute inset-0 cursor-zoom-in'
            aria-label='Enlarge image'
          />

          {isZoom && (
            <div className='fixed inset-0 z-[9999] bg-black bg-opacity-80 backdrop-blur'>
              <div className='absolute right-2 top-2 z-10 flex gap-1'>
                <ZoomUiButton
                  onClick={(e) => {
                    e.preventDefault()
                    panzoomRef.current?.zoomIn()
                  }}
                  aria-label='Zoom in'>
                  <ZoomIcon type='in' />
                </ZoomUiButton>
                <ZoomUiButton
                  onClick={(e) => {
                    e.preventDefault()
                    panzoomRef.current?.zoomOut()
                  }}
                  aria-label='Zoom out'>
                  <ZoomIcon type='out' />
                </ZoomUiButton>
                <ZoomUiButton
                  onClick={() => setIsZoom(false)}
                  aria-label='Minimize image'>
                  <CloseIcon />
                </ZoomUiButton>
              </div>

              <div
                ref={zoomContainerRef}
                className='absolute inset-0 flex cursor-zoom-out items-center justify-center'
                onClick={() => setIsZoom(false)}>
                <img
                  ref={zoomImgRef}
                  src={imageUrl}
                  alt={alt ?? ''}
                  width={width}
                  height={height}
                  loading='eager'
                  className='max-h-full max-w-full'
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </>
      )}
    </span>
  )
}

function ZoomUiButton({
  className = '',
  children,
  ...props
}: Omit<React.HTMLProps<HTMLButtonElement>, 'type'>) {
  return (
    <button
      type='button'
      className={`flex aspect-square w-8 items-center justify-center rounded bg-black/60 backdrop-blur backdrop-saturate-50 transition-colors hover:bg-neutral-700/80 ${className}`}
      {...props}>
      {children}
    </button>
  )
}

function ZoomIcon({ type }: { type: 'in' | 'out' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='h-5 w-5'>
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.35-4.35' />
      {type === 'in' ? (
        <>
          <path d='M11 8v6' />
          <path d='M8 11h6' />
        </>
      ) : (
        <path d='M8 11h6' />
      )}
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='h-5 w-5'>
      <path d='M18 6 6 18' />
      <path d='M6 6l12 12' />
    </svg>
  )
}
