import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class OutputLoginDto {
  @IsString()
  @IsNotEmpty()
  token: string

  @IsNumber()
  @IsNotEmpty()
  expiresIn: number
}
