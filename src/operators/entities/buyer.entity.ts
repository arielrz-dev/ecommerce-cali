import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('buyers')
export class Buyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  surname: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;
}
