import { Product } from 'src/products/entities/Product.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Buyer } from './buyer.entity';
import { IsDate, IsOptional, IsPositive, IsString, Min } from 'class-validator';

@Schema()
export class Order {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Buyer.name, required: false })
  buyer: Buyer | Types.ObjectId;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: Product.name, // Esto establece la referencia a la colección "products"
      },
    ],
    default: [], // Inicializa como un array vacío por defecto
  })
  products: Types.Array<Types.ObjectId>;

  // @Prop({
  //   type: [
  //     {
  //       type: Types.ObjectId,
  //       ref: Product.name,
  //     },
  //   ],
  // })
  // products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export class FilterOrderDto {
  @IsOptional()
  @IsString()
  buyerId?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(0)
  @IsPositive()
  offset?: number;
}
