import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class InputUpdatePasswordDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  newPassword: string
}
