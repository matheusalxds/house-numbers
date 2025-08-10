import bcrypt from 'bcrypt'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'

import { IHasher } from '@/modules/auth/domain/protocols/cryptography/cryptography.interface'

export interface JwtPayload {
  email: string
  sub: string
}

export class Hasher implements IHasher {
  constructor(
    private readonly secret: Secret,
    private readonly expiresIn = '1d',
    private readonly saltRounds = 10,
  ) {}

  compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed)
  }

  async hash(plain: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)
    return bcrypt.hash(plain, salt)
  }

  signJwt(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as SignOptions)
  }

  verifyJwt(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload
  }
}
