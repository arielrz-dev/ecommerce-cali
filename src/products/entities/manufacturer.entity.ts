import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Manufacturer extends Document {
  @Prop({ required: true, type: Number })
  id: number;

  @Prop({ required: true, type: String, maxlength: 50 })
  name: string;

  @Prop({ required: true, type: String, maxlength: 50 })
  address: string;

  @Prop({ required: true, type: String, maxlength: 50, unique: true })
  email: string;

  @Prop({ required: true, type: String, maxlength: 100 })
  image: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
