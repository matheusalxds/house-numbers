import { Express, Router } from 'express'

import { makeHasher } from '@/modules/auth/main/factories/hasher.factory'
import { requireAuth } from '@/modules/auth/main/middlewares/auth.middleware'
import {
  makeCreateSnippetController,
  makeListAllSnippetsController,
  makeListOneSnippetController,
} from '@/modules/snippets/main/factories/controllers.factory'
import { adaptRoute } from '@/shared/adapters/express-route-adapter'

export default (app: Express): void => {
  const router = Router()

  router.post('/', requireAuth(makeHasher()), adaptRoute(makeCreateSnippetController()))
  router.get('/', requireAuth(makeHasher()), adaptRoute(makeListAllSnippetsController()))
  router.get('/:id', requireAuth(makeHasher()), adaptRoute(makeListOneSnippetController()))

  app.use('/v1/snippets', router)
}
