import { Request } from 'express'
import { z } from 'zod'

import { LoginUC } from '@/modules/auth/domain/use-cases/login'
import { Controller } from '@/shared/controllers/controller'
import { badRequest, HttpResponse, ok } from '@/shared/helpers/http'
import { LogMsgIn } from '@/shared/logger/log-msg'
import { ILogger } from '@/shared/logger/logger'

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export class LoginController extends Controller {
  private readonly logMsg: LogMsgIn = { fn: 'perform', origin: LoginController.name }

  constructor(
    private readonly loginUC: LoginUC,
    private readonly logger: ILogger,
  ) {
    super()
  }

  perform = async (req: Request): Promise<HttpResponse> => {
    this.logger.infoStart(this.logMsg, { body: req.body })
    const result = LoginSchema.safeParse(req.body)

    if (!result.success) return badRequest(result.error.issues)

    const { email, password } = result.data
    const token = await this.loginUC.perform({ email, password })

    this.logger.infoEnd(this.logMsg, { token })
    return ok(token)
  }
}
