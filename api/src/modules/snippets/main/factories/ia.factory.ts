import { OpenaiAdapter } from '@/modules/snippets/infra/ia/openai.adapter'

export const makeIA = () => new OpenaiAdapter()
