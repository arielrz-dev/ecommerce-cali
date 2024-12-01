import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUrl,
  IsEmail,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateManufacturerDto {
  @ApiProperty({
    description: 'Manufacturer name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({
    description: 'Manufacturer address',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  readonly address: string;

  @ApiProperty({
    description: 'Manufacturer email',
    example: 'contact@manufacturer.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'URL of the manufacturer image or logo',
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly image: string;
}
export class UpdateManufacturerDTO extends PartialType(
  OmitType(CreateManufacturerDto, ['name']),
) {}
