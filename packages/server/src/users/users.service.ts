import { Injectable } from '@nestjs/common'
import { UserDto } from './user.dto'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt'
import { createOrUpdateUsers, deleteUserById, deleteUserByEmail, getUserById, getUserByEmail, readAllUsers } from '../infra/db'

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = []

  async create(newUser: UserDto) {
    newUser.id = uuid()
    newUser.password = bcrypt.hashSync(newUser.password, 10)
    
    const isEmailAlreadyInUse = await emailValidation(newUser.email)

    if (isEmailAlreadyInUse === null) {
      return {
        success: 'false',
        message: 'Something went wrong'
      }
    }

    if (isEmailAlreadyInUse) {
      return {
        success: 'false',
        message: 'Email Already In Use'
      }
    }

    const { success } = await createOrUpdateUsers(newUser)

    return {success}
  }

  async findAllUsers() {
    const {success, data} = await readAllUsers()

    if (success){
      return {success, data}
    }
    return null
  }
}

async function emailValidation(email: string) {
  const { success, data } = await getUserByEmail(email)

  if (success) {
    return data?.email === email
  }

  return null
}