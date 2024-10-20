import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional
} from 'class-validator'

export class InputCreateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  category: number

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number

  @IsString()
  @IsNotEmpty()
  @IsOptional() //Temporariamente opcional
  path: string
}
