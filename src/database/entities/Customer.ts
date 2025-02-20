import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { ContactDatabase } from './Contact';

@Entity()
export class CustomerDatabase {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => ContactDatabase, (contact) => contact.customer)
  contacts: ContactDatabase[];
}
