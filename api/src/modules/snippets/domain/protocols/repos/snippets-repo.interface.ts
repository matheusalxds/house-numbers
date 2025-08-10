import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { Pagination, PaginationParamsDTO } from '@/shared/db/dto/pagination'

export interface ISnippetsRepo {
  create: (params: Partial<Snippet>) => Promise<Snippet>
  findAll: (params: PaginationParamsDTO) => Promise<Pagination<Snippet>>
  findOne: (id: string) => Promise<null | Snippet>
  update: (id: string, params: Partial<Snippet>) => Promise<null | Snippet>
}
