export interface MarketoFormProps {
    formId: string
    baseUrl?: string
    munchkinId?: string

    onLoad?: () => {},
    onSuccess?: (response: any, redirect: string) => void,
}
