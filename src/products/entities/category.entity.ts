import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from './Product.entity';
import { Exclude } from 'class-transformer';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt?: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: 'categories_products',
    joinColumn: {
      name: 'category_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
    }, //debe estar en un lado de la relacion.
  })
  products: Product[];
}
