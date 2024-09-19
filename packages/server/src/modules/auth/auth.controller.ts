import { Body, Controller, HttpCode, HttpStatus, Post, Put } from "@nestjs/common"
import { AuthResponseDto } from './dto/auth.dto'
import { AuthService } from "./auth.service"
import { UpdatePasswordDto } from "./dto/updatePassword.dto"
import { LoginDto } from "./dto/login.dto"

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() input: LoginDto): Promise<AuthResponseDto> {
        return await this.authService.signIn(input)
    }

    @Put('updatePassword')
    async updatePassword(@Body() input: UpdatePasswordDto) {
        return await this.authService.updatePassword(input)
    }
}