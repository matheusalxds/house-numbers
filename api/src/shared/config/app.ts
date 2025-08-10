import cors from 'cors'
import express from 'express'

import snippetsRoutes from '@/modules/snippets/main/routes/snippet.routes'

const app = express()

app.use(express.json())
app.use(cors())

snippetsRoutes(app)

export { app }
