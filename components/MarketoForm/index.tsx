import styles from './styles.module.scss'
import useMarketo from './useMarketo'
import { MarketoFormProps } from './types'

export default function MarketoForm(props: MarketoFormProps) {
    useMarketo(props)
    return <div className={styles.marketoFormContainerV2}>
        <form className='mktoForm' data-id={props.formId} />
    </div>
}
