import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put
} from '@nestjs/common'
import { OutputLoginDto } from './dto/outputLogin.dto'
import { AuthService } from './auth.service'
import { InputLoginDto } from './dto/inputLogin.dto'
import { InputUpdatePasswordDto } from './dto/inputUpdatePassword.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() input: InputLoginDto): Promise<OutputLoginDto> {
    return await this.authService.signIn(input)
  }

  @Put('updatePassword')
  async updatePassword(@Body() input: InputUpdatePasswordDto) {
    return await this.authService.updatePassword(input)
  }
}
