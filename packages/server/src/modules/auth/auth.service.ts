import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync as bcryptCompareSync } from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { UpdatePasswordDto } from './dto/updatePassword.dto'
import { UsersRepository } from '../dynamodb/repositories/usersRepository'
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto'
import { ErrorsService } from '../errors/errors.service'

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME'
    )
  }

  async signIn(input: LoginDto) {
    const { success: userFound, data } =
      await this.usersRepository.getUserByEmail(input.email)

    if (!userFound) {
      throw ErrorsService.userNotFound()
    }

    if (!bcryptCompareSync(input.password, data.password)) {
      throw ErrorsService.failToLogin()
    }

    const payload = {
      sub: data.id,
      email: data.email,
      name: data.name,
      isAdmin: data.isAdmin
    }
    const token = this.jwtService.sign(payload)

    return { success: true, token, expiresIn: this.jwtExpirationTimeInSeconds }
  }

  async updatePassword(input: UpdatePasswordDto) {
    const { success: userFound } = await this.usersRepository.getUserByEmail(
      input.email
    )

    if (!userFound) {
      throw ErrorsService.userNotFound()
    }

    input.newPassword = bcrypt.hashSync(input.newPassword, 10)

    const { success } = await this.usersRepository.updatePassword(input)

    if (!success) {
      throw ErrorsService.failToChangePassword()
    }

    return { success: true, message: 'Password updated successfully' }
  }
}
