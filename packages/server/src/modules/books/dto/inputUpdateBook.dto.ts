import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional
} from 'class-validator'

export class InputUpdateBookDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  category: number

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  amount: number

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  path: string
}
