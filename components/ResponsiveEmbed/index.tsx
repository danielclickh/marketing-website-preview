import styles from './styles.module.scss'
import { ResponsiveEmbedProps } from './types'

export default function ResponsiveEmbed(props: ResponsiveEmbedProps) {
  const style = {
    '--ratio': props.ratio
  } as React.CSSProperties

  return (
    <div className={styles.responsiveEmbed} style={style}>
      {!!props?.html && (
        <div
          className='inner'
          dangerouslySetInnerHTML={{ __html: props.html }}></div>
      )}
      {!!props?.children && <div className='inner'>{props.children}</div>}
    </div>
  )
}
