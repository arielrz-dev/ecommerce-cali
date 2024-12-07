import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Buyer extends Document {
  @Prop({ required: false, type: String })
  id: number;

  @Prop({ required: true, type: String, maxlength: 50 })
  name: string;

  @Prop({ required: true, type: String, maxlength: 50 })
  surname: string;

  @Prop({ required: true, type: String, maxlength: 15 })
  phone: string;

  @Prop({
    type: [
      {
        street: { type: String },
        number: { type: Number },
        city: { type: String },
        country: { type: String },
      },
    ],
  })
  addresses: Types.Array<Record<string, any>>;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
