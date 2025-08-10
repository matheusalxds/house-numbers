import { beforeEach, describe, expect, it } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'

import { IHasher } from '@/modules/auth/domain/protocols/cryptography/cryptography.interface'
import { IUserAuthRepo } from '@/modules/auth/domain/protocols/repos/user-auth-repo.interface'
import { HasherInput, SignUpUC } from '@/modules/auth/domain/use-cases/sign-up'
import { mockAuthUser } from '@/modules/auth/infra/db/repos/models/test/mock/auth-user.mock'

describe('SignUpUC', () => {
  let sut: SignUpUC
  let repo: MockProxy<IUserAuthRepo>
  let hasher: MockProxy<IHasher>
  let mockedSnippet = mockAuthUser()
  const hashedPass = 'hashed_pass'
  const signedJwt = 'any_jwt'

  beforeEach(() => {
    repo = mock<IUserAuthRepo>()
    hasher = mock<IHasher>()
    hasher.hash.mockResolvedValue(hashedPass)
    hasher.signJwt.mockResolvedValue(signedJwt)
    mockedSnippet = mockAuthUser()
    repo.create.mockResolvedValue(mockedSnippet)

    sut = new SignUpUC(repo, hasher)
  })

  const mockParams = (): HasherInput => ({
    email: 'any_text',
    password: 'any_pass',
  })

  it('should call repo with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(repo.findByEmail).toHaveBeenCalledTimes(1)
    expect(repo.findByEmail).toHaveBeenCalledWith(params.email)
  })

  it('should call hasher with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(hasher.hash).toHaveBeenCalledTimes(1)
    expect(hasher.hash).toHaveBeenCalledWith(params.password)
  })

  it('should call repo.create with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(repo.create).toHaveBeenCalledTimes(1)
    expect(repo.create).toHaveBeenCalledWith({ email: params.email, password: hashedPass })
  })

  it('should return correct values on success', async () => {
    const newSnippet = await sut.perform(mockParams())

    expect(newSnippet).toEqual(signedJwt)
  })
})
