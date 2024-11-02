import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

@Injectable()
export class ErrorsService {
  static userNotFound() {
    return new HttpException(
      {
        success: false,
        message: 'User not found!'
      },
      HttpStatus.NOT_FOUND
    )
  }
}
