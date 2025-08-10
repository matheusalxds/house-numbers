import { JwtPayload } from '@/modules/auth/infra/cryptography/hasher.adapter'

export interface IHasher {
  compare: (value: string, hash: string) => Promise<boolean>
  hash: (plaintext: string) => Promise<string>
  signJwt: (payload: JwtPayload) => string
  verifyJwt: (token: string) => JwtPayload
}
