import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto } from './user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: UserDto) {
    await this.userService.create(user)
  }

  @Get()
  async users() {
    await this.userService.findAllUsers()
  }
}
