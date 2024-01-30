export interface MarketoFormProps {
    formId: string
    baseUrl?: string
    munchkinId?: string

    onLoad?: () => any,
    onSuccess?: (response: any, redirect: string) => any,
}
