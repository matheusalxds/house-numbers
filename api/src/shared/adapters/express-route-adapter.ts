import { Request, Response } from 'express'

import { IController } from '@/shared/controllers/controller'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
