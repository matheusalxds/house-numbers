import { UserAuthEntity } from '@/modules/auth/domain/entities/user-auth.entity'

export interface IUserAuthRepo {
  create: (params: Partial<UserAuthEntity>) => Promise<UserAuthEntity>
  findByEmail: (id: string) => Promise<null | UserAuthEntity>
}
