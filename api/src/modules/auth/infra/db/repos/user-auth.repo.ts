import { IUserAuthRepo } from '@/modules/auth/domain/protocols/repos/user-auth-repo.interface'
import { UserModel } from '@/modules/auth/infra/db/repos/models/user.model'
import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'

export class UserAUthRepository implements IUserAuthRepo {
  async create(params: Partial<Snippet>): Promise<any> {
    const response = await UserModel.create(params)
    return response.toObject()
  }

  async findByEmail(email: string): Promise<any> {
    return UserModel.findOne({ email }).lean()
  }
}
