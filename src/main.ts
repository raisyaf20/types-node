import express, { type NextFunction, type Application } from 'express'
import { routes } from './routes/index.ts'
import { logger } from './utils/logger.ts'
import bodyParser from 'body-parser'
import cors from 'cors'

// conection
import './utils/connectDb.ts'

const app: Application = express()
const port: number = 8000

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors())
  .use((req, res, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
  })

routes(app)

app.listen(port, () => {
  logger.info(`listen in port http://localhost:${port}`)
})
