import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuyerDto {
  @ApiProperty({
    description: "Buyer's first name",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({
    description: "Buyer's surname",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly surname: string;

  @ApiProperty({
    description: "Buyer's phone number",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(15)
  readonly phone: string;
}

export class UpdateBuyerDto extends PartialType(
  OmitType(CreateBuyerDto, ['name']),
) {}
