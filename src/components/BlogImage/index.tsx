import { getProxiedMediaUrl } from '@/lib/api/strapi'
import Panzoom from '@panzoom/panzoom'
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
  const [holdingShift, setHoldingShift] = useState(false)
  const zoomContainerRef = useRef<null | HTMLDivElement>(null)
  const zoomImgRef = useRef<null | HTMLImageElement>(null)

  useEffect(() => {
    const toggleShift = (event: MouseEvent) => {
      setHoldingShift(event.shiftKey)
    }
    window.addEventListener('mousedown', toggleShift)
    window.addEventListener('mouseup', toggleShift)

    return () => {
      window.removeEventListener('mousedown', toggleShift)
      window.removeEventListener('mouseup', toggleShift)
    }
  }, [])

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
      const panzoom = Panzoom(zoomImgEl)
      zoomContainerEl.addEventListener('wheel', panzoom.zoomWithWheel)
      return () => {
        zoomContainerEl.removeEventListener('wheel', panzoom.zoomWithWheel)
        panzoom.destroy()
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
              <div className='absolute left-0 right-0 top-0 z-10'>
                <button
                  className='cursor-pointer'
                  onClick={() => setIsZoom(false)}>
                  close
                </button>
              </div>
              <div
                className='absolute inset-0 flex items-center justify-center'
                ref={zoomContainerRef}>
                <img
                  className={`max-h-full max-w-full ${holdingShift ? '!cursor-move' : '!cursor-zoom-out'}`}
                  loading='eager'
                  alt={alt ?? ''}
                  src={getProxiedMediaUrl(preview ?? src)}
                  width={width}
                  ref={zoomImgRef}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
