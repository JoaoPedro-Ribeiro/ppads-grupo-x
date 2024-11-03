import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsInt
} from 'class-validator'
import { Transform } from 'class-transformer'

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

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  category: number

  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  amount: number

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  coverUrl: string
}
