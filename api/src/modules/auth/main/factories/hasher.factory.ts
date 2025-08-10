import { Hasher } from '@/modules/auth/infra/cryptography/hasher.adapter'

export const makeHasher = (): Hasher => new Hasher('random_secret', '1d', 10)
