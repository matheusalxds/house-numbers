import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DB_URL: z.string().min(1, 'DB_URL is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  NODE_ENV: z
    .enum(['development', 'production'])
    .or(z.literal('test'))
    .transform((v) => (v === 'test' ? 'development' : v))
    .default('development'),
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  PORT: z.string().min(1, 'PORT is required').default('3000'),
})

export const env = envSchema.parse(process.env)
