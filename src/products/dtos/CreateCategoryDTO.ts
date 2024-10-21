import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
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
}

export class UpdateCategoryDTO extends PartialType(
  OmitType(CreateCategoryDto, ['name']),
) {}
