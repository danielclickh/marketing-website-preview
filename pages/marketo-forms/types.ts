export interface MarketoFormObject {
  getFormElem(): JQuery,
  onSubmit(callback: MarketoCallback): void,
  onValidate(callback: MarketoCallback): void,
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
