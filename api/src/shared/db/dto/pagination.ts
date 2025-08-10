import type { PaginateResult } from 'mongoose'

export interface PaginationParamsDTO {
  limit: number
  page: number
}

export class Pagination<T> {
  data: T[] = []
  limit: number
  page: number
  total: number
  totalPages: number

  constructor(result: PaginateResult<T>) {
    this.data = result.docs
    this.total = result.totalDocs
    this.totalPages = result.totalPages
    this.limit = result.limit
    this.page = result.page ?? 0
  }
}
