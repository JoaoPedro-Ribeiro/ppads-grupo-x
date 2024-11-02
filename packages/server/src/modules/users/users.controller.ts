import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { InputDeleteUserDto } from './dto/inputDeleteUser.dto'
import { InputCreateUserDto } from './dto/inputCreateUser.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('createUser')
  @UseGuards(JwtAuthGuard)
  async create(@Body() user: InputCreateUserDto) {
    return await this.userService.create(user)
  }

  @Get('getAllUsers')
  @UseGuards(JwtAuthGuard)
  async users() {
    return await this.userService.findAllUsers()
  }

  @Delete('deleteUser')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body() data: InputDeleteUserDto) {
    return await this.userService.deleteUser(data?.email)
  }
}
