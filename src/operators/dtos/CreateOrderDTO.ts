import { IsDate, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateOperatorDto } from '../dtos/CreateOperatorDTO'; // Ajusta la ruta según la ubicación del archivo

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
  @IsNotEmpty()
  @IsMongoId()
  readonly operator: string;

  // @ApiProperty({
  //   description: 'List of products in the order',
  //   type: [CreateProductDto],
  // })
  // @IsArray()
  // @IsNotEmpty()
  // readonly products: string[];

  @ApiProperty({
    description: 'List of product IDs in the order',
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true }) // Valida que cada elemento sea un ObjectId válido
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class addProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
