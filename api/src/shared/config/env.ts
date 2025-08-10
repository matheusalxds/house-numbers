import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DB_URL: z.string().min(1, 'Database URL is required'),
  NODE_ENV: z
    .enum(['development', 'production'])
    .or(z.literal('test'))
    .transform((v) => (v === 'test' ? 'development' : v))
    .default('development'),
})

export const env = envSchema.parse(process.env)
