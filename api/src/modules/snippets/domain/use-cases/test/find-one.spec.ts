import { beforeEach, describe, expect, it } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'

import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'
import { FindOneSnippetUC } from '@/modules/snippets/domain/use-cases/find-one-snippet'
import { mockSnippet } from '@/modules/snippets/infra/db/models/test/mock/snippet.mock'
import { ILogger } from '@/shared/logger/logger'

describe('FindOneSnippetUC', () => {
  let sut: FindOneSnippetUC
  let repo: MockProxy<ISnippetsRepo>
  let logger: MockProxy<ILogger>
  let mockedSnippet = mockSnippet()

  beforeEach(() => {
    repo = mock<ISnippetsRepo>()
    mockedSnippet = mockSnippet()
    repo.findOne.mockResolvedValue(mockedSnippet)
    logger = mock<ILogger>()

    sut = new FindOneSnippetUC(repo, logger)
  })

  const mockParams = (): string => 'any_valid_id'

  it('should call repo with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(repo.findOne).toHaveBeenCalledTimes(1)
    expect(repo.findOne).toHaveBeenCalledWith(params)
  })

  it('should return correct values on success', async () => {
    const newSnippet = await sut.perform(mockParams())

    expect(newSnippet).toEqual(mockedSnippet)
  })
})
