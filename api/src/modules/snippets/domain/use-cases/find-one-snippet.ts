import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export class FindOneSnippetUC {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: FindOneSnippetUC.name }

  constructor(
    private snippetsRepository: SnippetsRepository,
    private readonly logger: ILogger,
  ) {}

  async perform(id: string): Promise<null | Snippet> {
    this.logger.infoStart(this.logMsg, { id })
    const snippet = await this.snippetsRepository.findOne(id)

    this.logger.infoEnd(this.logMsg, { snippet })
    return snippet
  }
}
