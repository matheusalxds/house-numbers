import * as mongoose from 'mongoose'

import { env } from '@/shared/config/env'

export async function connectMongo(): Promise<void> {
  await mongoose.connect(env.DB_URL)
}
