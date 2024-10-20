import { IsEmail } from 'class-validator'

export class InputDeleteUserDto {
  @IsEmail()
  email: string
}
