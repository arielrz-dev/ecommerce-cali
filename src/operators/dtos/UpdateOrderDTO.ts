import { Product } from '../../products/entities/Product.entity';
import { Operator } from '../entities/operator.entity';

export class UpdateOrderDto {
  date: Date;
  operator: Operator;
  products: Product[];
}
