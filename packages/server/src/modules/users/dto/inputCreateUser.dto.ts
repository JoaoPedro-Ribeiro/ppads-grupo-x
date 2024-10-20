import { IsString, IsEmail, IsBoolean, IsNotEmpty } from 'class-validator'

export class InputCreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean
}
