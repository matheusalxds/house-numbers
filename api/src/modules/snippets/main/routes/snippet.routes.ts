import { Express, Router } from 'express'

import { makeCreateSnippetController } from '@/modules/snippets/main/factories/controllers.factory'
import { adaptRoute } from '@/shared/adapters/express-route-adapter'

export default (app: Express): void => {
  const router = Router()

  router.post('/', adaptRoute(makeCreateSnippetController()))

  app.use('/v1/snippets', router)
}
