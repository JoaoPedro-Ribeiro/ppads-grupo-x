import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { InputDeleteUserDto } from './dto/inputDeleteUser.dto'
import { InputCreateUserDto } from './dto/inputCreateUser.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('createUser')
  async create(@Body() user: InputCreateUserDto) {
    return await this.userService.create(user)
  }

  @Get('getAllUsers')
  async users() {
    return await this.userService.findAllUsers()
  }

  @Delete('deleteUser')
  async deleteUser(@Body() data: InputDeleteUserDto) {
    return await this.userService.deleteUser(data?.email)
  }
}
