import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto {
  @ApiProperty({ description: 'Id of the buyer' })
  @IsNotEmpty()
  @Type(() => Number)
  readonly buyerId: number;

  @ApiProperty({ description: 'Date of the order' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly date: Date;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
