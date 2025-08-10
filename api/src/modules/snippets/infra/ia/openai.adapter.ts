import { OpenAI } from 'openai'

import { IIAAdapter } from '@/modules/snippets/domain/protocols/ia/ia.interface'

export class OpenaiAdapter implements IIAAdapter {
  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey })
  }

  async perform(text: string): Promise<string> {
    const prompt = this.buildPrompt(text)

    const response = await this.openai.chat.completions.create({
      messages: [
        {
          content:
            'You are an assistant specialized in generating clear and concise summaries of any given content.',
          role: 'system',
        },
        {
          content: prompt,
          role: 'user',
        },
      ],
      model: 'gpt-4o',
      temperature: 0.7,
    })

    const summary = response.choices[0]?.message.content
    return summary ?? ''
  }

  private buildPrompt(text: string): string {
    return [
      'The following text will be provided as input:',
      '--- TEXT START ---',
      text,
      '--- TEXT END ---',
      '',
      'Your task is to create a concise and complete summary of the above content.',
      'Highlight the main points, ensure clarity, avoid repeating sentences from the original text, and keep the summary to a maximum of 30 words.',
    ].join('\n')
  }
}
