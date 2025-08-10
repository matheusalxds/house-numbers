import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'
import { Pagination, PaginationParamsDTO } from '@/shared/db/dto/pagination'
import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg'
import { logger } from '@/shared/logger/logger'

export class FindAllSnippetsUC {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: FindAllSnippetsUC.name }

  constructor(private snippetsRepository: SnippetsRepository) {}

  async perform(input: PaginationParamsDTO): Promise<Pagination<Snippet>> {
    logger.info(msgStart(this.logMsg, input))

    const response = await this.snippetsRepository.findAll(input)

    logger.info(msgEnd(this.logMsg, response))
    return response
  }
}
