import { HttpResponse, serverError } from '@/modules/snippets/application/helpers/http'
import { LogMsgIn, msgEnd } from '@/shared/logger/log-msg'
import { logger } from '@/shared/logger/logger'

export interface IController<T = any> {
  handle: (request: T) => Promise<HttpResponse<T>>
}

export abstract class Controller implements IController {
  private readonly logControllerMsg: LogMsgIn = { fn: 'perform', origin: Controller.name }

  async handle(input: any): Promise<HttpResponse> {
    try {
      return await this.perform(input)
    } catch (error) {
      if (error instanceof Error) {
        logger.error(msgEnd(this.logControllerMsg, { name: error.name, stack: error.stack }))
      } else {
        logger.error(msgEnd(this.logControllerMsg, { message: 'Unknown error', value: error }))
      }
      return serverError(error as Error)
    }
  }

  abstract perform(input: any): Promise<HttpResponse>
}
