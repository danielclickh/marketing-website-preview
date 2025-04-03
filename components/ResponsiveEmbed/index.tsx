import { useEffect, useRef, useState } from 'react'
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

  const embedRef = useRef<HTMLDivElement | null>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const embed = embedRef.current
    if (embed && lazyLoad) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === embed && entry.isIntersecting) {
            setLoad(true)
          }
        })
      })

      observer.observe(embed)

      return () => {
        observer.disconnect()
      }
    }
  }, [lazyLoad, embedRef])

  return (
    <div
      ref={embedRef}
      className={`relative ${styles.responsiveEmbed}`}
      style={style}>
      {lazyLoad && (
        <div className='absolute inset-0 bg-black flex'>
          <div className='w-10 aspect-square rounded-full border-4 border-primary-300/20 border-t-primary-300 m-auto animate-spin' />
        </div>
      )}
      {(!lazyLoad || load) && (
        <>
          {!!html && (
            <div
              className='inner'
              dangerouslySetInnerHTML={{ __html: html }}></div>
          )}
          {!!children && <div className='inner'>{children}</div>}
        </>
      )}
    </div>
  )
}
