import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Product ID',
  })
  id: number;

  @ApiProperty({
    description: 'Product name',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed product description',
  })
  description: string;

  @ApiProperty({
    description: 'Product price',
  })
  price: number;

  @ApiProperty({
    description: 'Available stock quantity',
  })
  stock: number;

  @ApiProperty({
    description: 'Country where the product is made',
  })
  made_in: string;

  @ApiProperty({
    description: 'URL of the product image',
  })
  image: string;

  @ApiProperty({
    description: 'Date when the product was deleted (if applicable)',
    nullable: true,
  })
  deletedAt?: Date;
}
