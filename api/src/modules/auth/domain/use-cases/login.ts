import { IHasher } from '@/modules/auth/domain/protocols/cryptography/cryptography.interface'
import { IUserAuthRepo } from '@/modules/auth/domain/protocols/repos/user-auth-repo.interface'

export interface LoginInput {
  email: string
  password: string
}
export interface Output {
  token: string
  user: null | { email: string; id: string; name?: string }
}

export class LoginUC {
  constructor(
    private userAuthRepo: IUserAuthRepo,
    private hasher: IHasher,
  ) {}

  async perform({ email, password }: LoginInput): Promise<Output> {
    const user = await this.userAuthRepo.findByEmail(email)
    if (!user) return { token: '', user: null }

    const ok = await this.hasher.compare(password, user.password)
    if (!ok) return { token: '', user: null }

    const token = this.hasher.signJwt({ email: user.email, sub: user._id })

    return { token, user: { email: user.email, id: user._id } }
  }
}
