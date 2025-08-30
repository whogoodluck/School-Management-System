import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'
import JsonResponse from '../utils/response'

interface ErrorType extends Error {
  statusCode?: number
  code?: string
  details?: { message: string }[]
}

const getErrorResponse = (err: ErrorType) => {
  const types: Record<string, { statusCode: number; message: string }> = {
    HttpError: {
      statusCode: err.statusCode || 400,
      message: err.message
    },
    default: {
      statusCode: err.statusCode || 500,
      message: 'internal server error'
    }
  }

  return types[err.name] || types['default']
}

const errorHandler = (err: ErrorType, _req: Request, res: Response, _next: NextFunction) => {
  const { statusCode, message } = getErrorResponse(err)

  logger.error(err.message)

  return res.status(statusCode).json(new JsonResponse({ status: 'error', message }))
}

export default errorHandler
