import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'

export class UpdateSnippetUC {
  constructor(private snippetsRepository: SnippetsRepository) {}

  async perform(id: string, input: Partial<Snippet>): Promise<null | Snippet> {

    const updatedSnippet = await this.snippetsRepository.update(id, input)

    if (!updatedSnippet) {
      return null
    }

    return updatedSnippet
  }
}
