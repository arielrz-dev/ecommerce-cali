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
import { Expose } from 'class-transformer';

//TODO: completar mas adelante
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt?: Date;

  @ManyToOne(() => Buyer, (buyer) => buyer.orders)
  buyer: Buyer;

  @OneToMany(() => DetailOrder, (detailOrder) => detailOrder.order)
  details: DetailOrder[];

  @Expose({ name: 'product' })
  get products() {
    if (this.details) {
      return this.details
        .filter((detail) => !!detail)
        .map((detail) => ({
          ...detail.product,
          quantity: detail.quantity,
        }));
    }
    return [];
  }

  @Expose({ name: 'total' })
  get total() {
    if (this.details) {
      return this.details
        .filter((detail) => !!detail)
        .reduce((total, detail) => {
          const totalDetail = detail.product.price * detail.quantity;
          return total + totalDetail;
        }, 0);
    }
    return 0;
  }
}
