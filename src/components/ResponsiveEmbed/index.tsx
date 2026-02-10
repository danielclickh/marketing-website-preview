import LazyLoad from '../LazyLoad'
import styles from './styles.module.scss'
import { ResponsiveEmbedProps } from './types'
import VideoConsentWrapper from '@/components-cleaned/VideoConsentWrapper'
import { useCallback } from 'react'

export default function ResponsiveEmbed({
  ratio,
  html,
  children,
  lazyLoad = true
}: ResponsiveEmbedProps) {
  const style = {
    '--ratio': ratio
  } as React.CSSProperties

  const Content = useCallback(() => {
    return (
      <>
        {!!html && (
          <div
            className='inner'
            dangerouslySetInnerHTML={{ __html: html }}></div>
        )}
        {!!children && <div className='inner'>{children}</div>}
      </>
    )
  }, [html, children])

  return (
    <VideoConsentWrapper>
      <div className={`relative ${styles.responsiveEmbed}`} style={style}>
        {lazyLoad && (
          <div className='absolute inset-0 flex bg-black'>
            <div className='m-auto aspect-square w-10 animate-spin rounded-full border-4 border-primary-300/20 border-t-primary-300' />
          </div>
        )}
        {!lazyLoad && <Content />}
        {lazyLoad && (
          <LazyLoad>
            <Content />
          </LazyLoad>
        )}
      </div>
    </VideoConsentWrapper>
  )
}
