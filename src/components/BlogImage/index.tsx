import { getProxiedMediaUrl } from '@/lib/api/strapi'
import Panzoom, { PanzoomObject } from '@panzoom/panzoom'
import { useState, useEffect, useRef } from 'react'

export default function BlogImage({
  src,
  preview,
  width,
  height,
  alt,
  ...props
}: any) {
  const imgRef = useRef<null | HTMLImageElement>(null)
  const [canZoom, setCanZoom] = useState(false)
  const [isZoom, setIsZoom] = useState(false)

  const panzoomRef = useRef<PanzoomObject | null>(null)
  const zoomContainerRef = useRef<null | HTMLDivElement>(null)
  const zoomImgRef = useRef<null | HTMLImageElement>(null)

  useEffect(() => {
    if (isZoom) {
      const closeZoom = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsZoom(false)
        }
      }

      window.addEventListener('keyup', closeZoom)

      return () => {
        window.removeEventListener('keyup', closeZoom)
      }
    }
  }, [isZoom])

  useEffect(() => {
    const imgEl = imgRef.current
    if (imgEl) {
      const imgHasLink = imgEl.closest('a')
      setCanZoom(!imgHasLink)
    }
  }, [imgRef.current])

  useEffect(() => {
    const zoomContainerEl = zoomContainerRef.current
    const zoomImgEl = zoomImgRef.current
    if (zoomContainerEl && zoomImgEl && isZoom) {
      const panzoom = Panzoom(zoomImgEl, {
        pinchAndPan: true
      })

      // Enable zooming by scroll
      const zoomWithWheel = (event: WheelEvent) => {
        panzoom.zoomWithWheel(event, { step: 0.05 })
      }

      // Store ref
      panzoomRef.current = panzoom

      zoomContainerEl.addEventListener('wheel', zoomWithWheel)
      return () => {
        zoomContainerEl.removeEventListener('wheel', zoomWithWheel)
        panzoom.destroy()
        panzoomRef.current = null
      }
    }
  }, [zoomContainerRef.current, zoomImgRef.current, isZoom])

  return (
    <div className='relative mb-9 flex w-full justify-center'>
      <img
        loading='lazy'
        alt={alt ?? ''}
        src={getProxiedMediaUrl(preview ?? src)}
        width={width}
        ref={imgRef}
      />
      {canZoom && (
        <>
          <button
            onClick={() => setIsZoom(true)}
            className='absolute inset-0 cursor-zoom-in'>
            <span className='sr-only'>Enlarge image</span>
          </button>
          {isZoom && (
            <div className='fixed inset-0 z-[9999] bg-black bg-opacity-80 backdrop-blur'>
              <div className='absolute right-2 top-2 z-10 flex gap-1'>
                <ZoomUiButton
                  onClick={(event) => {
                    event.preventDefault()
                    panzoomRef.current?.zoomIn()
                  }}>
                  <span className='sr-only'>Zoom in</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-5 w-5'>
                    <circle cx='11' cy='11' r='8' />
                    <path d='m21 21-4.35-4.35M11 8v6m-3-3h6' />
                  </svg>
                </ZoomUiButton>
                <ZoomUiButton
                  onClick={(event) => {
                    event.preventDefault()
                    panzoomRef.current?.zoomOut()
                  }}>
                  <span className='sr-only'>Zoom out</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-5 w-5'>
                    <circle cx='11' cy='11' r='8' />
                    <path d='m21 21-4.35-4.35M8 11h6' />
                  </svg>
                </ZoomUiButton>
                <ZoomUiButton onClick={() => setIsZoom(false)}>
                  <span className='sr-only'>Minimize image</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-5 w-5'>
                    <path d='M18 6 6 18M6 6l12 12' />
                  </svg>
                </ZoomUiButton>
              </div>
              <div
                className='absolute inset-0 flex cursor-zoom-out items-center justify-center'
                ref={zoomContainerRef}
                onClick={(event) => setIsZoom(false)}>
                <img
                  className='max-h-full max-w-full'
                  loading='eager'
                  alt={alt ?? ''}
                  src={getProxiedMediaUrl(preview ?? src)}
                  width={width}
                  ref={zoomImgRef}
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
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
      className={`flex aspect-square w-8 cursor-pointer items-center justify-center rounded bg-black/60 backdrop-blur backdrop-saturate-50 transition-colors hover:bg-neutral-700/80 ${className}`}
      {...props}>
      {children}
    </button>
  )
}
