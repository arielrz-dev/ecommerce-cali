import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';

@Schema()
export class Operator {
  @Prop({ type: String })
  id: string;

  @Prop({
    type: String,
    unique: true,
  })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  role: string;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);

export class FilterOperatorDto {
  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(0)
  @IsPositive()
  offset?: number;
}
