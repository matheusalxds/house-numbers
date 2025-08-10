import { beforeEach, describe, expect, it } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'

import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'
import { FindAllSnippetsUC } from '@/modules/snippets/domain/use-cases/find-all-snippets'
import { mockSnippet } from '@/modules/snippets/infra/db/models/test/mock/snippet.mock'
import { PaginationParamsDTO } from '@/shared/db/dto/pagination'

describe('FindAllSnippetsUC', () => {
  let sut: FindAllSnippetsUC
  let repo: MockProxy<ISnippetsRepo>
  let mockedSnippet = mockSnippet()

  beforeEach(() => {
    repo = mock<ISnippetsRepo>()
    mockedSnippet = mockSnippet()
    repo.findAll.mockResolvedValue({
      data: [mockedSnippet],
      limit: 10,
      page: 1,
      total: 1,
      totalPages: 10,
    })

    sut = new FindAllSnippetsUC(repo)
  })

  const mockParams = (): PaginationParamsDTO => ({ limit: 10, page: 1 })

  it('should call repo with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(repo.findAll).toHaveBeenCalledTimes(1)
    expect(repo.findAll).toHaveBeenCalledWith(params)
  })

  it('should return correct values on success', async () => {
    const newSnippet = await sut.perform(mockParams())

    expect(newSnippet).toEqual({
      data: [mockedSnippet],
      limit: 10,
      page: 1,
      total: 1,
      totalPages: 10,
    })
  })
})
