import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt'
import { UsersRepository } from '../dynamodb/repositories/usersRepository'
import { ErrorsService } from '../errors/errors.service'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(input: UserDto) {
    const newUser = {
      ...input,
      id: uuid()
    }

    newUser.password = bcrypt.hashSync(newUser.password, 10)

    const isEmailAlreadyInUse = await this.emailValidation(newUser.email)

    if (isEmailAlreadyInUse) {
      throw ErrorsService.emailAlreadyInUse()
    }

    const { success } = await this.usersRepository.createUser(newUser)

    if (!success) {
      throw ErrorsService.failToCreateUser()
    }

    return { success: true, message: 'User created successfully' }
  }

  async deleteUser(email: string) {
    const emailExists = await this.emailValidation(email)

    if (!emailExists) {
      throw ErrorsService.userNotFound()
    }

    const { success: deletionSuccess } =
      await this.usersRepository.deleteUserByEmail(email)

    if (!deletionSuccess) {
      throw ErrorsService.failToDeleteUser()
    }

    return { success: true, message: 'User deleted successfully' }
  }

  async findAllUsers() {
    const { success, data } = await this.usersRepository.readAllUsers()

    if (success) {
      return { success, data }
    }

    throw ErrorsService.dynamoError()
  }

  async emailValidation(email: string) {
    const { success, data } = await this.usersRepository.getUserByEmail(email)

    if (success) {
      return data?.email === email
    }

    throw ErrorsService.dynamoError()
  }
}
