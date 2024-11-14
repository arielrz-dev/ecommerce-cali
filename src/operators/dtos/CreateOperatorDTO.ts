import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOperatorDto {
  @ApiProperty({
    description: "Operator's email address",
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password for operator login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;

  @ApiProperty({
    description: 'Role assigned to the operator',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  readonly role: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  readonly buyerId: number;
}

export class UpdateOperatorDto extends PartialType(
  OmitType(CreateOperatorDto, ['email']),
) {}
