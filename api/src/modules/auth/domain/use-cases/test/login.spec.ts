import { beforeEach, describe, expect, it } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'

import { IHasher } from '@/modules/auth/domain/protocols/cryptography/cryptography.interface'
import { IUserAuthRepo } from '@/modules/auth/domain/protocols/repos/user-auth-repo.interface'
import { LoginInput, LoginUC } from '@/modules/auth/domain/use-cases/login'
import { mockAuthUser } from '@/modules/auth/infra/db/repos/models/test/mock/auth-user.mock'

describe('LoginUC', () => {
  let sut: LoginUC
  let repo: MockProxy<IUserAuthRepo>
  let hasher: MockProxy<IHasher>
  const mockedAuthUser = mockAuthUser()
  const hashedPass = 'hashed_pass'
  const signedJwt = 'any_jwt'

  beforeEach(() => {
    repo = mock<IUserAuthRepo>()
    repo.findByEmail.mockResolvedValue(mockedAuthUser)
    hasher = mock<IHasher>()
    hasher.hash.mockResolvedValue(hashedPass)
    hasher.compare.mockResolvedValue(true)
    hasher.signJwt.mockReturnValue(signedJwt)

    sut = new LoginUC(repo, hasher)
  })

  const mockParams = (): LoginInput => ({
    email: 'any_text',
    password: 'any_pass',
  })

  it('should call repo with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(repo.findByEmail).toHaveBeenCalledTimes(1)
    expect(repo.findByEmail).toHaveBeenCalledWith(params.email)
  })

  it('should returns null if repo.findByEmail returns null', async () => {
    const params = mockParams()
    repo.findByEmail.mockResolvedValueOnce(null)

    const response = await sut.perform(params)

    expect(response).toEqual({ token: '', user: null })
  })

  it('should call hasher.compare with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(hasher.compare).toHaveBeenCalledTimes(1)
    expect(hasher.compare).toHaveBeenCalledWith(params.password, mockedAuthUser.password)
  })

  it('should call hasher.compare returns false', async () => {
    const params = mockParams()
    hasher.compare.mockResolvedValueOnce(false)

    const response = await sut.perform(params)

    expect(response).toEqual({ token: '', user: null })
  })

  it('should call hasher.signJwt with correct params', async () => {
    const params = mockParams()

    await sut.perform(params)

    expect(hasher.signJwt).toHaveBeenCalledTimes(1)
    expect(hasher.signJwt).toHaveBeenCalledWith({
      email: mockedAuthUser.email,
      sub: mockedAuthUser._id,
    })
  })

  it('should return correct values on success', async () => {
    const newSnippet = await sut.perform(mockParams())

    expect(newSnippet).toEqual({
      token: signedJwt,
      user: { email: mockedAuthUser.email, id: mockedAuthUser._id },
    })
  })
})
