import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsInt
} from 'class-validator'
import { Transform } from 'class-transformer'

export class InputCreateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  category: number

  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  amount: number

  @IsOptional()
  @IsString()
  coverUrl?: string
}
