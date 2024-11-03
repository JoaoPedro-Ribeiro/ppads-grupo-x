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

  static failToLogin() {
    return new HttpException(
      {
        errorCode: 'X-005',
        success: false,
        message: 'Fail To Login!'
      },
      HttpStatus.UNAUTHORIZED
    )
  }

  static failToChangePassword() {
    return new HttpException(
      {
        errorCode: 'X-006',
        success: false,
        message: 'Fail To Change Password!'
      },
      HttpStatus.BAD_REQUEST
    )
  }

  static failToUploadFile() {
    return new HttpException(
      {
        errorCode: 'X-007',
        success: false,
        message: 'Fail To Upload File to S3!'
      },
      HttpStatus.BAD_REQUEST
    )
  }

  static failToDeleteFile() {
    return new HttpException(
      {
        errorCode: 'X-008',
        success: false,
        message: 'Fail To Delete File on S3!'
      },
      HttpStatus.BAD_REQUEST
    )
  }

  static failToCreateBook() {
    return new HttpException(
      {
        errorCode: 'X-009',
        success: false,
        message: 'Fail To Create Book!'
      },
      HttpStatus.BAD_REQUEST
    )
  }

  static bookNotFound() {
    return new HttpException(
      {
        errorCode: 'X-010',
        success: false,
        message: 'Book Not Found!'
      },
      HttpStatus.NOT_FOUND
    )
  }

  static failToDeleteBook() {
    return new HttpException(
      {
        errorCode: 'X-011',
        success: false,
        message: 'Fail To Delete Book!'
      },
      HttpStatus.BAD_REQUEST
    )
  }

  static failToUpdateBook() {
    return new HttpException(
      {
        errorCode: 'X-012',
        success: false,
        message: 'Fail To Update Book!'
      },
      HttpStatus.BAD_REQUEST
    )
  }

  static categoryNoFound() {
    return new HttpException(
      {
        errorCode: 'X-013',
        success: false,
        message: 'Category Not Found!'
      },
      HttpStatus.NOT_FOUND
    )
  }

  static dynamoError() {
    return new HttpException(
      {
        errorCode: 'X-014',
        success: false,
        message: 'Dynamo Error!'
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}
