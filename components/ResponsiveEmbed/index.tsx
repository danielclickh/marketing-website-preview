import styles from './styles.module.scss'
import { ResponsiveEmbedProps } from './types'

export default function ResponsiveEmbed(props: ResponsiveEmbedProps) {
    const style = {
        '--ratio': props.ratio
    } as React.CSSProperties

    return <div className={styles.responsiveEmbed} style={style}>
        <div className="inner" dangerouslySetInnerHTML={{__html: props?.html || ''}}>
            {props?.children}
        </div>
    </div>
}
