import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product extends Document {
  // @Prop({ required: false, type: Number })
  // id: number;

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
