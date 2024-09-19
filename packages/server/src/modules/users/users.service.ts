import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt'
import { UsersRepository } from '../dynamodb/repositories/usersRepository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(newUser: UserDto) {
    newUser.id = uuid()
    newUser.password = bcrypt.hashSync(newUser.password, 10)
    
    const isEmailAlreadyInUse = await this.emailValidation(newUser.email)

    if (isEmailAlreadyInUse === null) {
      return {
        success: false,
        message: 'Something went wrong'
      }
    }

    if (isEmailAlreadyInUse) {
      return {
        success: false,
        message: 'Email Already In Use'
      }
    }

    const { success } = await this.usersRepository.createUsers(newUser)

    if (!success) {
      return { success: false, message: 'Failed to create user' }
    }
  
    return { success: true, message: 'User created successfully' }
  }

  async deleteUser(email: string) {
    const emailExists = await this.emailValidation(email)
  
    if (!emailExists) {
      return { success: false, message: 'User does not exist!' }
    }
  
    const { success: deletionSuccess } = await this.usersRepository.deleteUserByEmail(email)
  
    if (!deletionSuccess) {
      return { success: false, message: 'Failed to delete user' }
    }
  
    return { success: true, message: 'User deleted successfully' }
  }  

  async findAllUsers() {
    const {success, data} = await this.usersRepository.readAllUsers()

    if (success){
      return {success, data}
    }
    return null
  }

  async emailValidation(email: string) {
    const { success, data } = await this.usersRepository.getUserByEmail(email)
  
    if (success) {
      return data?.email === email
    }
  
    return null
  }
}