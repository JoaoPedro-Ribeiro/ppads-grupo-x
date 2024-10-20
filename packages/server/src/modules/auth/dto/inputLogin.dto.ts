import { IsString, IsEmail, IsBoolean, IsNotEmpty } from 'class-validator'

export class InputLoginDto {
  @IsEmail()
  email!: string
  
  @IsString()
  @IsNotEmpty()
  password!: string
  
  @IsBoolean()
  @IsNotEmpty()
  stayLoggedIn!: boolean
}