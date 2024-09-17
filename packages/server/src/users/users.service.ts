import { Injectable } from '@nestjs/common'
import { UserDto } from './user.dto'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt'
import { createOrUpdateUsers, getUserByEmail, readAllUsers } from '../infra/repositories/usersRepository'

@Injectable()
export class UsersService {
  async create(newUser: UserDto) {
    newUser.id = uuid()
    newUser.password = bcrypt.hashSync(newUser.password, 10)
    
    const isEmailAlreadyInUse = await emailValidation(newUser.email)

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

    const { success } = await createOrUpdateUsers(newUser)

    if (!success) {
      return { success: false, message: 'Failed to create user' };
    }
  
    return { success: true, message: 'User created successfully' };
  }

  async findAllUsers() {
    const {success, data} = await readAllUsers()

    if (success){
      return {success, data}
    }
    return null
  }

  async findByEmail(userEmail: string): Promise<UserDto | null> {
    const { success, data } = await getUserByEmail(userEmail);
  
    if (!success || !data) {
      return null;
    }
  
    const { id, name, email, password } = data
    return { id, name, email, password }
  }  
}

async function emailValidation(email: string) {
  const { success, data } = await getUserByEmail(email)

  if (success) {
    return data?.email === email
  }

  return null
}