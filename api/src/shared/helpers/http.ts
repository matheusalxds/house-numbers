import { ZodError } from 'zod'

import { NotFoundError, ServerError } from '@/shared/errors/http'

export interface HttpResponse<T = any> {
  body: T
  statusCode: number
}

export const serverError = (error: Error): HttpResponse<Error> => ({
  body: new ServerError(error),
  statusCode: 500,
})

export const created = <T>(data: T): HttpResponse<T> => ({
  body: data,
  statusCode: 201,
})

export type ZodIssue = ZodError['issues'][number]
export const badRequest = (error: Error | ZodIssue[]): HttpResponse => ({
  body: { message: error, typeError: 'BadRequest' },
  statusCode: 400,
})

export const ok = <T>(data: T): HttpResponse<T> => ({
  body: data,
  statusCode: 200,
})

export const notFound = (field: string): HttpResponse => ({
  body: { message: new NotFoundError(field).message, typeError: 'NotFound' },
  statusCode: 404,
})

export const unauthorized = (): HttpResponse => ({
  body: { message: "You don't have permission to access this resource", typeError: 'Unauthorized' },
  statusCode: 401,
})
