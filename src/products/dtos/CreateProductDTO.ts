import {
  IsString,
  IsNumber,
  IsPositive,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  readonly made_in: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly image: string;
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDto, ['name']),
) {}
