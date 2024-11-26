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
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt?: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: 'categories_products',
    joinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    }, //debe estar en un lado de la relacion.
  })
  products: Product[];
}
