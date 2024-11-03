import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

@Injectable()
export class ErrorsService {
  static userNotFound() {
    return new HttpException(
      {
        errorCode: 'X-001',
        success: false,
        message: 'User not found!'
      },
      HttpStatus.NOT_FOUND
    )
  }

  static emailAlreadyInUse() {
    return new HttpException(
      {
        errorCode: 'X-002',
        success: false,
        message: 'Email Already In Use'
      },
      HttpStatus.CONFLICT
    )
  }

  static failToCreateUser() {
    return new HttpException(
      {
        errorCode: 'X-003',
        success: false,
        message: 'Fail To Create User'
      },
      HttpStatus.BAD_REQUEST
    )
  }

  static failToDeleteUser() {
    return new HttpException(
      {
        errorCode: 'X-004',
        success: false,
        message: 'Fail To Delete User'
      },
      HttpStatus.BAD_REQUEST
    )
  }

  static dynamoError() {
    return new HttpException(
      {
        errorCode: 'X-010',
        success: false,
        message: 'Dynamo Error!'
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}
