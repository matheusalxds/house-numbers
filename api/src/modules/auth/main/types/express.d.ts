import { JwtPayload } from '@/modules/auth/infra/cryptography/hasher.adapter'

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
}

export {}
