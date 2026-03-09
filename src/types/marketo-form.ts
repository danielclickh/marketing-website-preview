export interface MarketoFormObject {
  getFormElem(): JQuery
  validate(): void
  submit(): void
  submittable(value?: boolean): boolean | undefined
  allFieldsFilled(): boolean
  onSubmit(callback: MarketoCallback): void
  onValidate(callback: (valid: boolean) => void): void
  onSuccess: (
    callback: (response: any, redirect: string) => void | false
  ) => void
  setValues(values: Record<string, any>): void
  getValues(): Record<string, any>
  vals(values?: Record<string, any>): Record<string, any> | void
  addHiddenFields(values: Record<string, any>): void
  showErrorMessage(message: string, element?: JQuery): void
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
  ) => void

  getForm(formId: string | number): MarketoFormObject

  // Callbacks

  whenReady(callback: MarketoCallback): void
  onFormRender(callback: MarketoCallback): void
  whenRendered(callback: MarketoCallback): void
}
