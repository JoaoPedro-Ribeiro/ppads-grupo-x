import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto } from './dto/user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('createUser')
  async create(@Body() user: UserDto) {
    return await this.userService.create(user)
  }

  @Get('getAllUsers')
  async users() {
    return await this.userService.findAllUsers()
  }

  @Post('deleteUser')
  async deleteUser(@Body() data: any) {
    return await this.userService.deleteUser(data?.email)
  }
}
