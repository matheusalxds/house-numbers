import mongoose from 'mongoose'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'
import { SnippetModel } from '@/modules/snippets/infra/db/models/snippet.model'
import { mockSnippet } from '@/modules/snippets/infra/db/models/test/mock/snippet.mock'
import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'
import {
  clearDatabase,
  connectMemoryDb,
  disconnectMemoryDb,
} from '@/shared/db/test/mongodb-in-memory'

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

  describe('findAll()', () => {
    it('should return a list of snippets with pagination', async () => {
      await SnippetModel.create([mockSnippet(), mockSnippet()])

      const result = await sut.findAll({ limit: 10, page: 1 })

      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(2)
      expect(result.page).toBe(1)
      expect(result.limit).toBe(10)
    })
  })

  describe('findOne()', () => {
    it('should return a snippet', async () => {
      const mockedSnippet = mockSnippet()
      const created = await SnippetModel.create(mockedSnippet)

      const found = await sut.findOne(created._id)

      expect(found).not.toBeNull()
      expect(found?.text).toBe(mockedSnippet.text)
      expect(found?.summary).toBe(mockedSnippet.summary)
    })

    it('should return null if no snippet is found', async () => {
      const notFound = await sut.findOne(new mongoose.Types.ObjectId().toString())

      expect(notFound).toBeNull()
    })
  })

  describe('update()', () => {
    it('should return null if snippet is not found', async () => {
      const invalidId = '6123456789abcdef01234567'
      const result = await sut.update(invalidId, { text: 'new_text' })

      expect(result).toBeNull()
    })

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
