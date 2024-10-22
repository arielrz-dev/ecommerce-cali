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
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({
    description: 'Detailed product description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  readonly description: string;

  @ApiProperty({
    description: 'Product price',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty({
    description: 'Available stock quantity',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({
    description: 'Country where the product is made',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  readonly made_in: string;

  @ApiProperty({
    description: 'URL of the product image',
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly image: string;
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDto, ['name']),
) {}
