import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'

export class CreateSnippetUC {
  constructor(private snippetsRepository: ISnippetsRepo) {}

  async perform(input: Pick<Snippet, 'text'>): Promise<void> {
    await this.snippetsRepository.create(input)
  }
}
