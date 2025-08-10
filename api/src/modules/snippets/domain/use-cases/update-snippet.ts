import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export class UpdateSnippetUC {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: UpdateSnippetUC.name }

  constructor(
    private snippetsRepository: SnippetsRepository,
    private readonly logger: ILogger,
  ) {}

  async perform(id: string, input: Partial<Snippet>): Promise<null | Snippet> {
    this.logger.infoStart(this.logMsg, input)
    const updatedSnippet = await this.snippetsRepository.update(id, input)

    if (!updatedSnippet) {
      this.logger.infoEnd(this.logMsg, { updatedSnippet })
      return null
    }

    this.logger.infoEnd(this.logMsg, updatedSnippet)
    return updatedSnippet
  }
}
