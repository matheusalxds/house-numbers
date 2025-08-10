import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { IUserAuthRepo } from '@/modules/auth/domain/protocols/repos/user-auth-repo.interface'
import { mockAuthUser } from '@/modules/auth/infra/db/repos/models/test/mock/auth-user.mock'
import { UserModel } from '@/modules/auth/infra/db/repos/models/user.model'
import { UserAUthRepository } from '@/modules/auth/infra/db/repos/user-auth.repo'
import { clearDatabase, connectMemoryDb, disconnectMemoryDb } from '@/shared/db/test/mongodb-in-memory'

describe('UserAuthRepo', () => {
  let sut: IUserAuthRepo

  beforeAll(async () => {
    await connectMemoryDb()
  })

  afterAll(async () => {
    await disconnectMemoryDb()
  })

  beforeEach(async () => {
    await clearDatabase()
    sut = new UserAUthRepository()
  })

  describe('create()', () => {
    it('should create on snippet on success', async () => {
      const mockedAuthUser = mockAuthUser()

      const created = await sut.create(mockedAuthUser)

      expect(created).toHaveProperty('_id')
      expect(created.email).toBe(mockedAuthUser.email)
      expect(created.password).toBe(mockedAuthUser.password)
    })
  })

  describe('findByEmail()', () => {
    it('should return a snippet', async () => {
      const mockedAuthUser = mockAuthUser()
      const created = await UserModel.create(mockedAuthUser)

      const found = await sut.findByEmail(created.email)

      expect(found).not.toBeNull()
      expect(found?.email).toBe(mockedAuthUser.email)
      expect(found?.password).toBe(mockedAuthUser.password)
    })

    it('should return null if no snippet is found', async () => {
      const notFound = await sut.findByEmail('any_random_email')

      expect(notFound).toBeNull()
    })
  })
})
