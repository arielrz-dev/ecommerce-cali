import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';
import { Document, Types } from 'mongoose';

import { Manufacturer } from './manufacturer.entity';
import { AddressSchema } from 'src/operators/entities/address.entity';
import { Address } from 'aws-sdk/clients/ses';

@Schema()
export class Product extends Document {
  @Prop({ required: false, type: String })
  id: number;

  @Prop({ required: true, type: String, maxlength: 50 })
  name: string;

  @Prop({ required: false, type: String, maxlength: 255 })
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop({ type: String, maxlength: 70 })
  made_in: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: Date, nullable: true, default: null })
  deletedAt?: Date;

  @Prop({ type: Date, nullable: true, default: null })
  createdAt?: Date;

  @Prop({ type: Date, nullable: true, default: null })
  updateAt?: Date;

  @Prop(
    raw({
      type: AddressSchema,
    }),
  )
  category: Record<string, Address>;

  @Prop({ type: Types.ObjectId, ref: Manufacturer.name })
  manufacturer: Manufacturer | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(0)
  @IsPositive()
  offset?: number;

  @IsOptional()
  @Min(0)
  @IsPositive()
  priceMin?: number;

  @IsOptional()
  @ValidateIf((params) => params.priceMin)
  @Min(0)
  @IsPositive()
  priceMax?: number;
}
