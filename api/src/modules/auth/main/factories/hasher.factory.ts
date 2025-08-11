import { Hasher } from '@/modules/auth/infra/cryptography/hasher.adapter'
import { env } from '@/shared/config/env'

export const makeHasher = (): Hasher => new Hasher(env.JWT_SECRET, '1d', 10)
