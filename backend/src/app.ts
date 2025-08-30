import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import unknownEndpoint from './middlewares/unknown-endpoint'
import errorHandler from './middlewares/error-handler'

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(
  morgan('tiny', {
    skip: req => req.method === 'OPTIONS'
  })
)
app.use(cors())
app.use(helmet())

app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use(express.static('dist'))

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK')
})

app.use(unknownEndpoint)
app.use(errorHandler as unknown as express.ErrorRequestHandler)

export default app
