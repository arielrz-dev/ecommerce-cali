import { IsDate, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateOperatorDto } from '../dtos/CreateOperatorDTO'; // Ajusta la ruta según la ubicación del archivo
import { CreateProductDto } from '../../products/dtos/CreateProductDTO'; // Ajusta la ruta según la ubicación del archivo

//TODO: DTO A REVISAR
export class CreateOrderDto {
  @ApiProperty({
    description: 'Date of the order',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly date: Date;

  @ApiProperty({
    description: 'Operator handling the order',
    type: () => CreateOperatorDto,
  })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateOperatorDto)
  readonly operator: CreateOperatorDto;

  @ApiProperty({
    description: 'List of products in the order',
    type: [CreateProductDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => CreateProductDto)
  readonly products: CreateProductDto[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['date']),
) {}
