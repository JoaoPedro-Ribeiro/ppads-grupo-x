import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    let message = 'Internal Server Error'
    let errorCode: string | null = null

    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse()

      if (typeof responseBody === 'object' && responseBody !== null) {
        message = responseBody['message'] || message
        errorCode = responseBody['errorCode'] || null
      } else if (typeof responseBody === 'string') {
        message = responseBody
      }
    }

    response.status(status).json({
      success: false,
      message,
      errorCode
    })
  }
}
