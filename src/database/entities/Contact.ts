import { CustomerDatabase } from './Customer';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class ContactDatabase {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('numeric')
  numberPhone: number;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => CustomerDatabase, (customer) => customer.contacts)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerDatabase;
}
