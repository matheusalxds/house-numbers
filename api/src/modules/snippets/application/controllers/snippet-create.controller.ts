import { Request } from 'express'
import { z } from 'zod'

import { IIAAdapter } from '@/modules/snippets/domain/protocols/ia/ia.interface'
import { CreateSnippetUC } from '@/modules/snippets/domain/use-cases/create-snippet'
import { UpdateSnippetUC } from '@/modules/snippets/domain/use-cases/update-snippet'
import { Controller } from '@/shared/controllers/controller'
import { badRequest, created, HttpResponse } from '@/shared/helpers/http'

export const CreateSnippetSchema = z.object({
  text: z.string().min(1),
})

export class CreateSnippetController extends Controller {
  constructor(
    private readonly iaAdapter: IIAAdapter,
    private readonly createUC: CreateSnippetUC,
    private readonly updateUC: UpdateSnippetUC,
  ) {
    super()
  }

  perform = async (req: Request): Promise<HttpResponse> => {
    const result = CreateSnippetSchema.safeParse(req.body)

    if (!result.success) return badRequest(result.error.issues)

    const { text } = result.data
    const snippet = await this.createUC.perform({ text })

    const summary = await this.iaAdapter.perform(text)
    const updatedSnippet = await this.updateUC.perform(snippet._id, { summary })

    return created(updatedSnippet)
  }
}
