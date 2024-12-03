import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: false, type: Number })
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
