import { Request } from 'express'

import { FindOneSnippetUC } from '@/modules/snippets/domain/use-cases/find-one-snippet'
import { Controller } from '@/shared/controllers/controller'
import { HttpResponse, notFound, ok } from '@/shared/helpers/http'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export class ListOneSnippetController extends Controller {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: ListOneSnippetController.name }

  constructor(
    private readonly findOne: FindOneSnippetUC,
    private readonly logger: ILogger,
  ) {
    super()
  }

  perform = async (req: Request): Promise<HttpResponse> => {
    this.logger.infoStart(this.logMsg, req.params)
    const { id } = req.params

    const snippet = await this.findOne.perform(id)

    if (!snippet) {
      this.logger.error(this.logMsg, { snippet })
      return notFound('Snippet')
    }

    this.logger.infoEnd(this.logMsg, snippet)
    return ok(snippet)
  }
}
