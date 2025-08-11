import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { app } from '@/shared/config/app'
import {
  clearDatabase,
  connectMemoryDb,
  disconnectMemoryDb,
} from '@/shared/db/test/mongodb-in-memory'

const baseRoute = '/v1/auth/sign-up'

describe('SignUpController', () => {
  const mockParams = () => ({
    email: 'any_valid@mail.com',
    password: 'any_password',
  })

  beforeAll(async () => connectMemoryDb())
  afterAll(async () => disconnectMemoryDb())
  beforeEach(async () => clearDatabase())

  it('should return 200 on success', async () => {
    const mockedLogin = mockParams()

    const res = await request(app).post(baseRoute).send(mockedLogin)

    const typedBody = res.body as { token: string }
    const status = res.status
    expect(status).toBe(200)
    expect(typedBody.token).toBeTruthy()
  })

  it('should return status 400 if missing e-mail', async () => {
    const mockedLogin = mockParams()

    const res = await request(app)
      .post(baseRoute)
      .send({ ...mockedLogin, email: '' })

    const status = res.status
    expect(status).toBe(400)
  })

  it('should return status 400 if missing password', async () => {
    const mockedLogin = mockParams()

    const res = await request(app)
      .post(baseRoute)
      .send({ ...mockedLogin, password: '' })

    const status = res.status
    expect(status).toBe(400)
  })
})
