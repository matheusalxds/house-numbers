import { SignUpController } from '@/modules/auth/domain/controller/sign-up.controller'
import { SignUpUC } from '@/modules/auth/domain/use-cases/sign-up'
import { UserAUthRepository } from '@/modules/auth/infra/db/repos/user-auth.repo'
import { makeHasher } from '@/modules/auth/main/factories/hasher.factory'
import { makeLogger } from '@/shared/factories/logger.factory'

export const makeSignUpController = (): SignUpController => {
  const repository = new UserAUthRepository()
  const createUC = new SignUpUC(repository, makeHasher())
  return new SignUpController(createUC, makeLogger())
}
