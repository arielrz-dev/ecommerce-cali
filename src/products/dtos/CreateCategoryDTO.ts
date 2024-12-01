import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
//PartialType y OmitType se importaran ahora desde swagger
//import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({
    description: 'Detailed category description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  readonly description: string;
}

export class UpdateCategoryDTO extends PartialType(
  OmitType(CreateCategoryDto, ['name']),
) {}
