import { OpenaiAdapter } from '@/modules/snippets/infra/ia/openai.adapter'
import { env } from '@/shared/config/env'

export const makeIA = () => new OpenaiAdapter(env.OPENAI_API_KEY)
