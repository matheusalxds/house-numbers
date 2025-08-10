import { OpenAI } from 'openai'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { OpenaiAdapter } from '../openai.adapter'

vi.mock('openai', () => ({
  OpenAI: vi.fn(),
}))

describe('OpenaiAdapter', () => {
  let sut: OpenaiAdapter
  let createSpy: ReturnType<typeof vi.fn>
  const apiKey = 'test-api-key'

  beforeEach(() => {
    vi.clearAllMocks()

    createSpy = vi.fn()
    const mockOpenAI = {
      chat: {
        completions: {
          create: createSpy,
        },
      },
    }

    vi.mocked(OpenAI).mockImplementation(() => mockOpenAI as unknown as OpenAI)

    sut = new OpenaiAdapter(apiKey)
  })

  describe('perform', () => {
    it('should initialize with the provided API key', () => {
      expect(OpenAI).toHaveBeenCalledWith({ apiKey })
    })

    it('should call OpenAI with correct parameters', async () => {
      const sampleText = 'Sample text'
      createSpy.mockResolvedValue({
        choices: [{ message: { content: 'Some content' } }],
      })

      await sut.perform(sampleText)

      expect(createSpy).toHaveBeenCalledWith({
        messages: [
          {
            content: 'You are an assistant specialized in generating clear and concise summaries of any given content.',
            role: 'system',
          },
          {
            content: expect.stringContaining('--- TEXT START ---\n' + sampleText + '\n--- TEXT END ---'),
            role: 'user',
          },
        ],
        model: 'gpt-4o',
        temperature: 0.7,
      })
    })

    it('should return the summary from OpenAI response', async () => {
      const expectedSummary = 'Summarized text'
      createSpy.mockResolvedValue({
        choices: [{ message: { content: expectedSummary } }],
      })

      const result = await sut.perform('Any text')

      expect(result).toBe(expectedSummary)
    })

    it('should return empty string when API response has no content', async () => {
      createSpy.mockResolvedValue({ choices: [] })

      const result = await sut.perform('Sample text')
      expect(result).toBe('')
    })

    it('should handle API errors properly', async () => {
      createSpy.mockRejectedValue(new Error('API Error'))

      await expect(sut.perform('Sample text')).rejects.toThrow('API Error')
    })
  })
})
