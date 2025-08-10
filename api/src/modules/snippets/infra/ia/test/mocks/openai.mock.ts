import { vi } from 'vitest'

export function mockOpenAIResponse() {
  vi.mock('openai', () => {
    return {
      OpenAI: vi.fn().mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{ message: { content: '• default bullet' } }],
            }),
          },
        },
      })),
    }
  })
}
