import { HttpResponse, serverError } from '@/shared/helpers/http';

export interface IController<T = any> {
  handle: (request: T) => Promise<HttpResponse<T>>
}

export abstract class Controller implements IController {

  async handle(input: any): Promise<HttpResponse> {
    try {
      return await this.perform(input)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  abstract perform(input: any): Promise<HttpResponse>
}

