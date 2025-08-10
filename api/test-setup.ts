import { mockOpenAIResponse } from './src/modules/snippets/infra/ia/test/mocks/openai.mock'
import { vi } from 'vitest'

mockOpenAIResponse()

vi.mock('@/v1/shared/config/env', () => ({
  env: {
    DB_URL: 'any_db_url',
    NODE_ENV: 'development',
    OPENAI_API_KEY: 'mock_key',
  },
}))
