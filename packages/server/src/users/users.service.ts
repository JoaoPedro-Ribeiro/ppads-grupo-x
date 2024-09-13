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
    
    const { success } = await createOrUpdateUsers(newUser)

    if (success){
      console.log('User criado! -> ', newUser)
      return {success}
    }
    console.log('USER -> ', newUser)
    return null
  }

  async findAllUsers() {
    const {success, data} = await readAllUsers()

    if (success){
      return {success, data}
    }
    return null
  }
}
