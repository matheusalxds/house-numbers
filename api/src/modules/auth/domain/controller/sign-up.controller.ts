import { Request } from 'express'
import { z } from 'zod'

import { SignUpUC } from '@/modules/auth/domain/use-cases/sign-up'
import { Controller } from '@/shared/controllers/controller'
import { badRequest, HttpResponse, ok } from '@/shared/helpers/http'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export const SignUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export class SignUpController extends Controller {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: SignUpController.name }

  constructor(
    private readonly createUC: SignUpUC,
    private readonly logger: ILogger,
  ) {
    super()
  }

  perform = async (req: Request): Promise<HttpResponse> => {
    this.logger.infoStart(this.logMsg, { body: req.body })
    const result = SignUpSchema.safeParse(req.body)

    if (!result.success) return badRequest(result.error.issues)

    const { email, password } = result.data
    const token = await this.createUC.perform({ email, password })

    this.logger.infoEnd(this.logMsg, { token })
    return ok({ token })
  }
}
