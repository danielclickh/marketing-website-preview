import styles from './styles.module.scss'
import useMarketo from './useMarketo'
import { MarketoFormProps } from './types'

export default function MarketoForm(props: MarketoFormProps) {

    const mergedProps: MarketoFormProps = {
        // Defaults
        baseUrl: '//discover.clickhouse.com',
        munchkinId: '238-FPC-317',

        // Component overrides
        ...props,

        // Combine our default success with the components success callback
        onSuccess: (marketoFormObject, response, redirect) => {
            marketoFormObject.getFormElem().hide()
            document.getElementById(`mktoForm_${props.formId}-success`)?.classList.remove('hidden')

            if (props.onSuccess) {
                props.onSuccess(marketoFormObject, response, redirect)
            }

            return false
        }
    }

    useMarketo(mergedProps)

    return <div className={styles.marketoFormContainerV2}>
        <form id={`mktoForm_${props.formId}`} />
        {props.children && <div className="hidden" id={`mktoForm_${props.formId}-success`}>{props.children}</div>}
    </div>
}
