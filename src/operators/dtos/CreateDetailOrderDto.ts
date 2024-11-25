import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsInt, Min } from 'class-validator';

export class CreateDetailOrderDto {
  @ApiProperty({ description: 'ID of the order' })
  @IsPositive()
  @IsNotEmpty()
  readonly orderId: number;

  @ApiProperty({ description: 'ID of the product' })
  @IsPositive()
  @IsNotEmpty()
  readonly productId: number;

  @ApiProperty({
    description: 'Quantity of the product in the order',
    example: 10,
    minimum: 1,
  })
  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  @IsNotEmpty()
  readonly quantity: number;
}

export class UpdateDetailOrderDto extends PartialType(CreateDetailOrderDto) {}
