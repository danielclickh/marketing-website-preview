import { useCallback } from 'react'
import LazyLoad from '../LazyLoad'
import styles from './styles.module.scss'
import { ResponsiveEmbedProps } from './types'

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
    <div className={`relative ${styles.responsiveEmbed}`} style={style}>
      {lazyLoad && (
        <div className='absolute inset-0 bg-black flex'>
          <div className='w-10 aspect-square rounded-full border-4 border-primary-300/20 border-t-primary-300 m-auto animate-spin' />
        </div>
      )}
      {!lazyLoad && <Content />}
      {lazyLoad && (
        <LazyLoad>
          <Content />
        </LazyLoad>
      )}
    </div>
  )
}
