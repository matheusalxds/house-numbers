import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { genToken } from '@/modules/auth/application/controllers/test/mock/get-token'
import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { SnippetModel } from '@/modules/snippets/infra/db/models/snippet.model'
import { mockSnippet } from '@/modules/snippets/infra/db/models/test/mock/snippet.mock'
import { app } from '@/shared/config/app'
import { Pagination } from '@/shared/db/dto/pagination'
import {
  clearDatabase,
  connectMemoryDb,
  disconnectMemoryDb,
} from '@/shared/db/test/mongodb-in-memory'

const baseRoute = '/v1/snippets'

describe('SnippetListAllController', () => {
  let token = ''

  beforeAll(async () => connectMemoryDb())
  afterAll(async () => disconnectMemoryDb())
  beforeEach(async () => {
    await clearDatabase()
    token = await genToken()
  })

  it('should return a paginated list on success', async () => {
    const firstSnippet = mockSnippet()
    const secondSnippet = mockSnippet()
    await SnippetModel.create([firstSnippet, secondSnippet])

    const res = await request(app).get(baseRoute).set('Authorization', `Bearer ${token}`)

    const typedBody = res.body as Pagination<Snippet>
    const status = res.status
    expect(status).toBe(200)
    expect(typedBody.data).toHaveLength(2)
    expect(typedBody.data[0]).toHaveProperty('_id')
    expect(typedBody.data[0].text).toBe(firstSnippet.text)
    expect(typedBody.data[0].summary).toBe(firstSnippet.summary)
    expect(typedBody.data[0].createdAt).toBe(firstSnippet.createdAt.toISOString())
    expect(typedBody.data[0].updatedAt).toBe(firstSnippet.updatedAt.toISOString())
    expect(typedBody.data[1]).toHaveProperty('_id')
    expect(typedBody.data[1].text).toBe(secondSnippet.text)
    expect(typedBody.data[1].summary).toBe(secondSnippet.summary)
    expect(typedBody.data[1].createdAt).toBe(secondSnippet.createdAt.toISOString())
    expect(typedBody.data[1].updatedAt).toBe(secondSnippet.updatedAt.toISOString())
  })

  it('should return 401 if token is not provided', async () => {
    const res = await request(app).get(baseRoute).set('Authorization', `Bearer `)

    expect(res.status).toBe(401)
  })
})
