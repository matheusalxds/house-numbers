import { IHasher } from '@/modules/auth/domain/protocols/cryptography/cryptography.interface'
import { IUserAuthRepo } from '@/modules/auth/domain/protocols/repos/user-auth-repo.interface'

export interface HasherInput {
  email: string
  name?: string
  password: string
}

export class SignUpUC {
  constructor(
    private userAuthRepo: IUserAuthRepo,
    private hasher: IHasher,
  ) {}

  async perform({ email, password }: HasherInput): Promise<null | string> {
    const exists = await this.userAuthRepo.findByEmail(email)
    if (exists) return null

    const hashed = await this.hasher.hash(password)
    const user = await this.userAuthRepo.create({ email, password: hashed })

    return this.hasher.signJwt({ email: user.email, sub: user._id })
  }
}
