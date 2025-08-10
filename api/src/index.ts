import 'tsconfig-paths/register'

import { app } from '@/shared/config/app'
import { connectMongo } from '@/shared/db/mongoose'
import { logger } from '@/shared/logger/logger'

connectMongo()
  .then(() => {
    logger.info('DB connection established!')
    app.listen(3000, () => {
      logger.info('Server on http://localhost:3000')
    })
  })
  .catch((_err: unknown) => {
    logger.error('Fail to connect to DB!')
    process.exit(1)
  })
