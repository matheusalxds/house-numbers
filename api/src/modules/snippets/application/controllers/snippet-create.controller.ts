import { Request } from 'express'
import { z } from 'zod'

import { IIAAdapter } from '@/modules/snippets/domain/protocols/ia/ia.interface'
import { CreateSnippetUC } from '@/modules/snippets/domain/use-cases/create-snippet'
import { UpdateSnippetUC } from '@/modules/snippets/domain/use-cases/update-snippet'
import { Controller } from '@/shared/controllers/controller'
import { badRequest, created, HttpResponse } from '@/shared/helpers/http'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export const CreateSnippetSchema = z.object({
  text: z.string().min(1),
})

export class CreateSnippetController extends Controller {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: CreateSnippetController.name }

  constructor(
    private readonly iaAdapter: IIAAdapter,
    private readonly createUC: CreateSnippetUC,
    private readonly updateUC: UpdateSnippetUC,
    private readonly logger: ILogger,
  ) {
    super()
  }

  perform = async (req: Request): Promise<HttpResponse> => {
    this.logger.infoStart(this.logMsg, { body: req.body })
    const result = CreateSnippetSchema.safeParse(req.body)

    if (!result.success) return badRequest(result.error.issues)

    const { text } = result.data
    const snippet = await this.createUC.perform({ text })

    const summary = await this.iaAdapter.perform(text)
    const updatedSnippet = await this.updateUC.perform(snippet._id, { summary })

    this.logger.infoEnd(this.logMsg, { snippet: updatedSnippet })
    return created(updatedSnippet)
  }
}
