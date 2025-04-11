export type WorkatoRequest =
  | WorkatoContactRequest
  | WorkatoNewsletterRequest
  | WorkatoEventRegisterRequest
  | WorkatoRecordedGatedContentRequest
  | WorkatoServiceUnavailableCountryRequest

export interface WorkatoResponse {
  cloudId?: string
}

export interface BaseWorkatoRequest {
  url?: string
  utm_campaign?: string
  utm_medium?: string
  utm_source?: string
  firstName?: string
  lastName?: string
  mkto_trk?: string
}

export interface WorkatoNewsletterRequest extends BaseWorkatoRequest {
  email: string
}

export interface WorkatoServiceUnavailableCountryRequest
  extends BaseWorkatoRequest {
  email: string
}

export interface WorkatoContactRequest extends BaseWorkatoRequest {
  firstName: string
  lastName: string
  email: string
  company?: string
  message?: string
}

export interface WorkatoEventRegisterRequest extends BaseWorkatoRequest {
  firstName: string
  lastName: string
  email: string
}

export interface WorkatoRecordedGatedContentRequest extends BaseWorkatoRequest {
  email: string
}
