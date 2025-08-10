import request from 'supertest'

import { Output } from '@/modules/auth/domain/use-cases/login'
import { mockAuthUser } from '@/modules/auth/infra/db/repos/models/test/mock/auth-user.mock'
import { UserModel } from '@/modules/auth/infra/db/repos/models/user.model'
import { makeHasher } from '@/modules/auth/main/factories/hasher.factory'
import { app } from '@/shared/config/app'

const loginRoute = '/v1/auth/login'

export const genToken = async (): Promise<string> => {
  const hasher = makeHasher()
  const mockedAuthUser = mockAuthUser()
  const password = await hasher.hash(mockedAuthUser.password)
  await UserModel.create({ email: mockedAuthUser.email, password })

  const auth = await request(app)
    .post(loginRoute)
    .send({ email: mockedAuthUser.email, password: mockedAuthUser.password })

  const authResponse = auth.body as Output
  return authResponse.token
}
