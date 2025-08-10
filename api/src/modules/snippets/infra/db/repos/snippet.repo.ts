import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'
import { SnippetModel } from '@/modules/snippets/infra/db/models/snippet.model'
import { Pagination, PaginationParamsDTO } from '@/shared/db/dto/pagination'

export class SnippetsRepository implements ISnippetsRepo {
  async create(params: Partial<Snippet>): Promise<Snippet> {
    const response = await SnippetModel.create(params)
    return response.toObject()
  }

  async findAll(params: PaginationParamsDTO): Promise<Pagination<Snippet>> {
    const response = await SnippetModel.paginate({}, params)
    return new Pagination(response)
  }

  async findOne(_id: string): Promise<null | Snippet> {
    return SnippetModel.findOne({ _id }).lean()
  }

  async update(_id: string, params: Partial<Snippet>): Promise<null | Snippet> {
    return SnippetModel.findByIdAndUpdate({ _id }, params, { new: true }).exec()
  }
}
