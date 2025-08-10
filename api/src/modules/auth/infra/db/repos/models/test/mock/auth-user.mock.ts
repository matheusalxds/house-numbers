import mongoose from 'mongoose'

import { UserAuthEntity } from '@/modules/auth/domain/entities/user-auth.entity'

export const mockAuthUser = (): UserAuthEntity => ({
  _id: new mongoose.Types.ObjectId().toString(),
  createdAt: new Date(),
  email: 'any_email@mail.com',
  password: 'any_random_pass',
  updatedAt: new Date(),
})
