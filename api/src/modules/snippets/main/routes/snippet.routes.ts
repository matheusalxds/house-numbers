import { Express, Router } from 'express'

import {
  makeCreateSnippetController,
  makeListAllSnippetsController,
} from '@/modules/snippets/main/factories/controllers.factory'
import { adaptRoute } from '@/shared/adapters/express-route-adapter'

export default (app: Express): void => {
  const router = Router()

  router.post('/', adaptRoute(makeCreateSnippetController()))
  router.get('/', adaptRoute(makeListAllSnippetsController()))

  app.use('/v1/snippets', router)
}
