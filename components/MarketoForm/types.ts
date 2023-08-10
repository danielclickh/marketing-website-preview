export interface MarketoFormObject {
    getFormElem: () => JQuery
}

export type MarketoCallback = (marketoFormObject: MarketoFormObject) => void

export interface MarketoFormProps {
    formId: string
    baseUrl?: string
    munchkinId?: string
    onLoad?: MarketoCallback
}

/**
 * @see https://developers.marketo.com/javascript-api/forms/api-reference/
 */
export interface MarketoFormsApi {

    // Methods

    loadForm: (
        baseUrl: string,
        munchkinId: string,
        formId: string,
        callback: MarketoCallback
    ) => void,

    // Callbacks

    whenReady(callback: MarketoCallback): void,
    onFormRender(callback: MarketoCallback): void,
    whenRendered(callback: MarketoCallback): void,

}
