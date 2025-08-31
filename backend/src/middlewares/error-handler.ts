import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import logger from '../utils/logger'
import { JsonResponse } from '../utils/response'
import multer from 'multer'

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
    ZodError: {
      statusCode: 400,
      message: 'Validation error'
    },
    default: {
      statusCode: err.statusCode || 500,
      message: 'Internal server error'
    }
  }

  return types[err.name] || types['default']
}

const getZodErrorMessage = (error: ZodError): string => {
  return error.issues
    .map(issue => {
      return `${issue.message}`
    })
    .join(', ')
}

const getZodErrorResponse = (err: ZodError) => {
  return {
    statusCode: 400,
    message: getZodErrorMessage(err)
  }
}

const getMulterErrorResponse = (err: multer.MulterError) => {
  switch (err.code) {
    case 'LIMIT_FILE_SIZE':
      return {
        statusCode: 400,
        message: 'File size too large. Maximum size is 5MB.'
      }
    case 'LIMIT_FILE_COUNT':
      return {
        statusCode: 400,
        message: 'Too many files. Maximum is 10 files.'
      }
    case 'LIMIT_UNEXPECTED_FILE':
      return {
        statusCode: 400,
        message: 'Unexpected file field.'
      }
    default:
      return {
        statusCode: 400,
        message: 'File upload error occurred.'
      }
  }
}

const errorHandler = (
  err: ErrorType | ZodError | multer.MulterError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500
  let message = 'Internal server error'

  if (err instanceof ZodError) {
    const { statusCode: errStatusCode, message: errMessage } = getZodErrorResponse(err)
    statusCode = errStatusCode
    message = errMessage
    logger.error('Validation Error ->', getZodErrorMessage(err))
  } else if (err instanceof multer.MulterError) {
    const { statusCode: errStatusCode, message: errMessage } = getMulterErrorResponse(err)
    statusCode = errStatusCode
    message = errMessage
    logger.error('Multer Error ->', err.message)
  } else {
    const { statusCode: errStatusCode, message: errMessage } = getErrorResponse(err)
    statusCode = errStatusCode
    message = errMessage
  }

  logger.error(err.message)
  return res.status(statusCode).json(new JsonResponse({ status: 'error', message }))
}

export default errorHandler
