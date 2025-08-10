import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { genToken } from '@/modules/auth/application/controllers/test/mock/get-token'
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
  let token = ''

  beforeAll(async () => connectMemoryDb())
  afterAll(async () => disconnectMemoryDb())
  beforeEach(async () => {
    await clearDatabase()
    token = await genToken()
  })

  it('should return only one snippet', async () => {
    const mockedSnippet = mockSnippet()
    const created = await SnippetModel.create(mockedSnippet)

    const res = await request(app)
      .get(`${baseRoute}/${created._id}`)
      .set('Authorization', `Bearer ${token}`)

    const body = res.body as Snippet
    expect(res.status).toBe(200)
    expect(body.text).toBe(mockedSnippet.text)
  })

  it('should return 404 if no snippet is found', async () => {
    const res = await request(app)
      .get(`${baseRoute}/68928188cad0a7c6a6eb326f`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(404)
  })

  it('should return 401 if token is not provided', async () => {
    const res = await request(app)
      .get(`${baseRoute}/68928188cad0a7c6a6eb326f`)
      .set('Authorization', `Bearer `)

    expect(res.status).toBe(401)
  })
})
