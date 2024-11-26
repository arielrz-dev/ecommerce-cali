import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  Index,
} from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Category } from './Category.entity';
import { Exclude } from 'class-transformer';

@Index(['manufacturer_id', 'price'])
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 70 })
  made_in: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;

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

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];
}
