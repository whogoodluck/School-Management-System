import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import schoolRouter from './routes/school.route'

import unknownEndpoint from './middlewares/unknown-endpoint'
import errorHandler from './middlewares/error-handler'
import path from 'path'

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(
  morgan('tiny', {
    skip: req => req.method === 'OPTIONS'
  })
)
app.use(
  cors({
    origin: 'http://localhost:5173/',
    credentials: true
  })
)
app.use(helmet())
app.use(compression())

app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// app.use('/schoolImages', express.static(path.join(__dirname, '../schoolImages')))
app.use(
  '/schoolImages',
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  },
  express.static(path.join(__dirname, '../schoolImages'))
)

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK')
})

app.use('/api/schools', schoolRouter)

app.use(unknownEndpoint)
app.use(errorHandler as unknown as express.ErrorRequestHandler)

export default app
