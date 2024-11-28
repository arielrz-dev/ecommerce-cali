// import { Product } from 'src/products/entities/Product.entity';
// import { Operator } from './operator.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Buyer } from './buyer.entity';
import { DetailOrder } from './detail_order.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { formatDate } from 'src/utils/date-utils';

//TODO: completar mas adelante
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Transform(({ value }) => formatDate(value), { toPlainOnly: true })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Transform(({ value }) => formatDate(value), { toPlainOnly: true })
  updateAt?: Date;

  @ManyToOne(() => Buyer, (buyer) => buyer.orders)
  buyer: Buyer;

  @Exclude()
  @OneToMany(() => DetailOrder, (detailOrder) => detailOrder.order)
  details: DetailOrder[];

  @Expose({ name: 'product' })
  get products() {
    if (this.details) {
      return this.details
        .filter((detail) => !!detail)
        .map((detail) => ({
          name: detail.product.name,
          desription: detail.product.description,
          stock: detail.product.stock,
          price: detail.product.price,
          quantity: detail.quantity,
        }));
    }
    return [];
  }

  @Expose({ name: 'total' })
  get total() {
    if (this.details) {
      const total = this.details
        .filter((detail) => !!detail)
        .reduce((total, detail) => {
          const totalDetail = detail.product.price * detail.quantity;
          return total + totalDetail;
        }, 0);
      return parseFloat(total.toFixed(2));
    }
    return 0;
  }
}
