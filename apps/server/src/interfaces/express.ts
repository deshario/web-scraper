import { Response } from 'express'
import { Send } from 'express-serve-static-core'

interface IApiResponse<T> {
  success: boolean
  error?: string
  data?: T
}

export interface IResponse<TData> extends Response {
  json: Send<IApiResponse<TData>, this>
}
