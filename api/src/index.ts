import 'tsconfig-paths/register'

import { app } from '@/shared/config/app'
import { env } from '@/shared/config/env'
import { connectMongo } from '@/shared/db/mongoose'
import { makeLogger } from '@/shared/factories/logger.factory'

connectMongo()
  .then(() => {
    makeLogger().infoMsg('DB connection established!')
    app.listen(+env.PORT, () => {
      makeLogger().infoMsg(`Server running on port: ${env.PORT}`)
    })
  })
  .catch((_err: unknown) => {
    makeLogger().errorMsg('Fail to connect to DB!')
    process.exit(1)
  })
