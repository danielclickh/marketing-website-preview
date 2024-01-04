import React from "react";

export interface MarketoFormObject {
    getFormElem(): JQuery,
    onSubmit(callback: MarketoCallback): void,
    onSuccess: (
        callback: (
            response: any,
            redirect: string
        ) => void|false
    ) => void,
    setValues(values: {
        [key: string]: any
    }): void,
    getValues(): object,
    addHiddenFields(values: {
        [key: string]: any
    }): void
}

export type MarketoCallback = (marketoFormObject: MarketoFormObject) => void

export interface MarketoFormProps {
    formId: string
    baseUrl?: string
    munchkinId?: string

    onLoad?: MarketoCallback,
    onSuccess?: (marketoFormObject: MarketoFormObject, response: any, redirect: string) => void|false,
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

    getForm(formId: string|number): MarketoFormObject

    // Callbacks

    whenReady(callback: MarketoCallback): void,
    onFormRender(callback: MarketoCallback): void,
    whenRendered(callback: MarketoCallback): void,

}
