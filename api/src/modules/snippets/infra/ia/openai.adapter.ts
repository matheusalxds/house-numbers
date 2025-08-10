import { IIAAdapter } from '@/modules/snippets/domain/protocols/ia/ia.interface'

export class OpenaiAdapter implements IIAAdapter {
  async perform(text: string): Promise<string> {
    return Promise.resolve(text)
  }
}
