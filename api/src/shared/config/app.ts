import cors from 'cors'
import express from 'express'

import authRoutes from '@/modules/auth/main/routes/auth.routes'
import snippetsRoutes from '@/modules/snippets/main/routes/snippet.routes'

const app = express()

app.use(express.json())
app.use(cors())

snippetsRoutes(app)
authRoutes(app)

export { app }
