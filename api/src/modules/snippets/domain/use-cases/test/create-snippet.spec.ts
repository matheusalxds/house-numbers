import { beforeEach, describe, expect, it } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'

import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'
import { CreateSnippetUC } from '@/modules/snippets/domain/use-cases/create-snippet'
import { mockSnippet } from '@/modules/snippets/infra/db/models/test/mock/snippet.mock'

describe('CreateSnippetUC', () => {
  let sut: CreateSnippetUC
  let repo: MockProxy<ISnippetsRepo>
  let mockedSnippet = mockSnippet()

  beforeEach(() => {
    repo = mock<ISnippetsRepo>()
    mockedSnippet = mockSnippet()
    repo.create.mockResolvedValue(mockedSnippet)

    sut = new CreateSnippetUC(repo)
  })

  const mockParams = () => ({ text: 'any_text' })

  it('should call repo with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(repo.create).toHaveBeenCalledTimes(1)
    expect(repo.create).toHaveBeenCalledWith(params)
  })

  it('should return correct values on success', async () => {
    const newSnippet = await sut.perform(mockParams())

    expect(newSnippet).toEqual(mockedSnippet)
  })
})
