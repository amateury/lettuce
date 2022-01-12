export type ErrorValue = {
  message?: string | object,
  value?: any
}

export type ErrorStatus = {
  [index: string]: ErrorValue[]
}

export interface ResponseVerifyErrors {
  message: string,
  errors?: ErrorStatus[] | string | string[] | object,
  statusCode?: number
}
