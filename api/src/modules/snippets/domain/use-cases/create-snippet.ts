import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { ISnippetsRepo } from '@/modules/snippets/domain/protocols/repos/snippets-repo.interface'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export class CreateSnippetUC {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: CreateSnippetUC.name }

  constructor(
    private snippetsRepository: ISnippetsRepo,
    private readonly logger: ILogger,
  ) {}

  async perform(input: Pick<Snippet, 'text'>): Promise<Snippet> {
    this.logger.infoStart(this.logMsg, input)

    const response = await this.snippetsRepository.create(input)

    this.logger.infoEnd(this.logMsg, response)
    return response
  }
}
