import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'
import { Pagination, PaginationParamsDTO } from '@/shared/db/dto/pagination'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export class FindAllSnippetsUC {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: FindAllSnippetsUC.name }

  constructor(
    private snippetsRepository: SnippetsRepository,
    private readonly logger: ILogger,
  ) {}

  async perform(input: PaginationParamsDTO): Promise<Pagination<Snippet>> {
    this.logger.infoStart(this.logMsg, input)

    const response = await this.snippetsRepository.findAll(input)

    this.logger.infoEnd(this.logMsg, response)
    return response
  }
}
