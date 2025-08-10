import { NextFunction, Request, Response } from 'express'

import { Hasher } from '@/modules/auth/infra/cryptography/hasher.adapter'
import { unauthorized } from '@/shared/helpers/http'

export const requireAuth =
  (hasher: Hasher) => (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth?.startsWith('Bearer ')) {
      const response = unauthorized()
      return res.status(response.statusCode).json(response.body)
    }

    try {
      const token = auth.split(' ')[1]
      const payload = hasher.verifyJwt(token)

      req.user = payload

      next()
    } catch {
      const response = unauthorized()
      return res.status(response.statusCode).json(response.body)
    }
  }
