import { Request } from 'express'

import { FindAllSnippetsUC } from '@/modules/snippets/domain/use-cases/find-all-snippets'
import { Controller } from '@/shared/controllers/controller'
import { HttpResponse, ok } from '@/shared/helpers/http'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export class ListAllSnippetsController extends Controller {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: ListAllSnippetsController.name }

  constructor(
    private readonly findAll: FindAllSnippetsUC,
    private readonly logger: ILogger,
  ) {
    super()
  }

  perform = async (req: Request): Promise<HttpResponse> => {
    this.logger.infoStart(this.logMsg, req.query)

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const snippets = await this.findAll.perform({ limit, page })

    this.logger.infoEnd(this.logMsg, snippets)
    return ok(snippets)
  }
}
