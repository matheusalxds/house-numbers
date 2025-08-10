import { Express, Router } from 'express'

import {
  makeLoginController,
  makeSignUpController,
} from '@/modules/auth/main/factories/controllers.factory'
import { adaptRoute } from '@/shared/adapters/express-route-adapter'

export default (app: Express): void => {
  const router = Router()

  router.post('/sign-up', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))

  app.use('/v1/auth', router)
}
