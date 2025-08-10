import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { app } from '@/shared/config/app'
import {
  clearDatabase,
  connectMemoryDb,
  disconnectMemoryDb,
} from '@/shared/db/test/mongodb-in-memory'

const baseRoute = '/v1/snippets'

describe('CreateSnippetController', () => {
  const mockParams = () => ({ text: 'any_text' })

  beforeAll(async () => connectMemoryDb())
  afterAll(async () => disconnectMemoryDb())
  beforeEach(async () => clearDatabase())

  it('should return 201 on success', async () => {
    const mockedSnippet = mockParams()

    const res = await request(app).post(baseRoute).send(mockedSnippet)

    const typedBody = res.body as Snippet
    const status = res.status
    expect(status).toBe(201)
    expect(typedBody).toHaveProperty('_id')
    expect(typedBody.text).toBe(mockedSnippet.text)
    expect(typedBody.summary).toBeTruthy()
  })
})
