import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { SnippetModel } from '@/modules/snippets/infra/db/models/snippet.model'
import { mockSnippet } from '@/modules/snippets/infra/db/models/test/mock/snippet.mock'
import { app } from '@/shared/config/app'
import {
  clearDatabase,
  connectMemoryDb,
  disconnectMemoryDb,
} from '@/shared/db/test/mongodb-in-memory'

const baseRoute = '/v1/snippets'

describe('SnippetListOneController', () => {
  beforeAll(async () => connectMemoryDb())
  afterAll(async () => disconnectMemoryDb())
  beforeEach(async () => {
    await clearDatabase()
  })

  it('should return only one snippet', async () => {
    const mockedSnippet = mockSnippet()
    const created = await SnippetModel.create(mockedSnippet)

    const res = await request(app).get(`${baseRoute}/${created._id}`)

    const body = res.body as Snippet
    expect(res.status).toBe(200)
    expect(body.text).toBe(mockedSnippet.text)
  })

  it('should return 404 if no snippet is found', async () => {
    const res = await request(app).get(`${baseRoute}/68928188cad0a7c6a6eb326f`)

    expect(res.status).toBe(404)
  })
})
