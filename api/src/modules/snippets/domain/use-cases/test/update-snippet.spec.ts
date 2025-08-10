import { beforeEach, describe, expect, it } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'

import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'
import { UpdateSnippetUC } from '@/modules/snippets/domain/use-cases/update-snippet'
import { mockSnippet } from '@/modules/snippets/infra/db/models/test/mock/snippet.mock'

describe('UpdateSnippetUC', () => {
  let sut: UpdateSnippetUC
  let repo: MockProxy<ISnippetsRepo>
  let mockedSnippet = mockSnippet()

  beforeEach(() => {
    repo = mock<ISnippetsRepo>()
    mockedSnippet = mockSnippet()
    repo.update.mockResolvedValue(mockedSnippet)

    sut = new UpdateSnippetUC(repo)
  })

  it('should call repo with correct params', async () => {
    const params = mockSnippet()

    await sut.perform(params._id, params)

    expect(repo.update).toHaveBeenCalledTimes(1)
    expect(repo.update).toHaveBeenCalledWith(params._id, params)
  })

  it('should return correct values on success', async () => {
    const params = mockSnippet()

    const newSnippet = await sut.perform(params._id, params)

    expect(newSnippet).toEqual(mockedSnippet)
  })

  it('should return null if update does not find the snippet', async () => {
    const params = mockSnippet()
    repo.update.mockResolvedValueOnce(null)

    const newSnippet = await sut.perform(params._id, params)

    expect(newSnippet).toBeNull()
  })
})
