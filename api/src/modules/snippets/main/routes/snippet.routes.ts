import { Express, Router } from 'express'

import {
  makeCreateSnippetController,
  makeListAllSnippetsController,
  makeListOneSnippetController,
} from '@/modules/snippets/main/factories/controllers.factory'
import { adaptRoute } from '@/shared/adapters/express-route-adapter'

export default (app: Express): void => {
  const router = Router()

  router.post('/', adaptRoute(makeCreateSnippetController()))
  router.get('/', adaptRoute(makeListAllSnippetsController()))
  router.get('/:id', adaptRoute(makeListOneSnippetController()))

  app.use('/v1/snippets', router)
}
