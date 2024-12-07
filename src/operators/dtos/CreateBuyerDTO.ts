import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsArray,
} from 'class-validator';
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

  @IsArray()
  @IsNotEmpty()
  readonly addresses: any;
}
