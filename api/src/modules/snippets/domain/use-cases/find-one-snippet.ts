import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'
import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg'
import { logger } from '@/shared/logger/logger'

export class FindOneSnippetUC {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: FindOneSnippetUC.name }

  constructor(private snippetsRepository: SnippetsRepository) {}

  async perform(id: string): Promise<null | Snippet> {
    logger.info(msgStart(this.logMsg, { id }))
    const snippet = await this.snippetsRepository.findOne(id)

    logger.info(msgEnd(this.logMsg, { snippet }))
    return snippet
  }
}
