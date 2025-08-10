import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'
import { SnippetModel } from '@/modules/snippets/infra/db/models/snippet.model';
import { mockSnippet } from '@/modules/snippets/infra/db/models/test/mock/snippet.mock'
import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'
import { clearDatabase, connectMemoryDb, disconnectMemoryDb } from '@/shared/db/test/mongodb-in-memory'

describe('SnippetsRepository', () => {
  let sut: ISnippetsRepo

  beforeAll(async () => {
    await connectMemoryDb()
  })

  afterAll(async () => {
    await disconnectMemoryDb()
  })

  beforeEach(async () => {
    await clearDatabase()
    sut = new SnippetsRepository()
  })

  describe('create()', () => {
    it('should create on snippet on success', async () => {
      const mockedSnippet = mockSnippet()

      const created = await sut.create(mockedSnippet)

      expect(created).toHaveProperty('_id')
      expect(created.summary).toBe(mockedSnippet.summary)
      expect(created.text).toBe(mockedSnippet.text)
    })
  })

  describe('update()', () => {
    it('should update snippet and return updated document', async () => {
      const mockedSnippet = mockSnippet()
      mockedSnippet.text = 'old_text'
      const created = await SnippetModel.create(mockedSnippet)
      const newText = 'new_text'

      const result = await sut.update(created._id, { text: newText })

      expect(result).toBeTruthy()
      expect(result?.text).toBe(newText)
    })
  })
})
