import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  @Prop({ type: String })
  street: string;

  @Prop({ type: Number })
  number: number;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
